import {
    selectFinalBilling,
    setGSTAndOtherCharges,
    setPayableAmount,
    setItemsTotalCost,
    selectDeliveryAddress,
    selectPaymentMethod
} from "../../features/delivery/deliverySlice";

import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { selectCart, setItemToCart } from "../../features/home/restaurantsSlice";
import calBilling from "../../utils/calBilling";
import { selectDeviceFingerPrint, selectUserDetails, selectCurrentTheme } from "../../features/home/homeSlice";
import DotBounceLoader from "../../utils/DotBounceLoader";
import Lottie from "lottie-react";
import successAnimation from "./../../assets/Success.json"
// import Razorpay from "razorpay";

const FinalBilling = () => {
    const {
        totalItemCost,
        deliveryCharge,
        deliveryKilometers,
        GSTAndOtherCharges,
        payableAmount
    } = useSelector(selectFinalBilling);

    const { userName, userEmail, userPhone } = useSelector(selectUserDetails);
    const theme = useSelector(selectCurrentTheme);

    // console.log(deliveryCharge);

    const deliveryAddress = useSelector(selectDeliveryAddress);
    const paymentMethod = useSelector(selectPaymentMethod);
    const cart = useSelector(selectCart);
    const deviceId = useSelector(selectDeviceFingerPrint)
    const cartItems = Object.values(cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [gst, setGst] = useState(0);
    const [openDeliveryInfo, setOpenDeliveryInfo] = useState(false);
    const [orderPlaceLoading, setOrderPlaceLoading] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [ verifyPayment, setVerifyPayment ] = useState(false);

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const checkoutClickHandler = async () => {
        if (Object.keys(deliveryAddress).length === 0 || paymentMethod === "") return;
        if (orderPlaceLoading) return;

        setOrderPlaceLoading(true);

        if (paymentMethod === "Online") {
            try {
                const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

                if (!res) {
                    alert('Razropay failed to load!!')
                    return
                }

                const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payments/onlineOrder`, {
                    method: "POST",
                    headers: {
                        "x-identifier": import.meta.env.VITE_HASHED_IDENTIFIER,
                        "Content-Type": "application/json",
                        "x-user-agent": navigator.userAgent,
                        "x-language": navigator.language,
                        "x-resolution": `${screen.height}x${screen.width}`,
                        "x-device-id": deviceId,
                    },

                    body: JSON.stringify({
                        amount: payableAmount,
                    }),

                    credentials: "include"
                });

                const response = await result.json();
                if (!result.ok) throw new Error(response.message);

                const { order } = response;

                const result2 = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payments/key`, {
                    method: "GET",
                    headers: {
                        "x-identifier": import.meta.env.VITE_HASHED_IDENTIFIER,
                        "Content-Type": "application/json",
                        "x-user-agent": navigator.userAgent,
                        "x-language": navigator.language,
                        "x-resolution": `${screen.height}x${screen.width}`,
                        "x-device-id": deviceId,
                    },
                    credentials: "include"
                })

                const response2 = await result2.json();
                if (!result2.ok) throw new Error(response2.message);

                setOrderPlaceLoading(false);
                const { key } = response2;
                // console.log("key", key, "id", order.id);

                const options = {
                    key,
                    amount: order.amount,
                    currency: 'INR',
                    name: 'ZestyEats',
                    description: 'Test Transaction',
                    Image: "/images/LogoSquare.png",
                    order_id: order.id,
                    prefill: {
                        name: userName,
                        email: userEmail,
                        contact: userPhone,
                    },
                    theme: {
                        color: theme === "dark" ? "#9f0712" : "#ff5200"
                    },

                    handler: async function (response) {
                        try {
                            setVerifyPayment(true);
                            const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payments/paymentVerification`, {
                                method: "POST",
                                headers: {
                                    "x-identifier": import.meta.env.VITE_HASHED_IDENTIFIER,
                                    "Content-Type": "application/json",
                                    "x-user-agent": navigator.userAgent,
                                    "x-language": navigator.language,
                                    "x-resolution": `${screen.height}x${screen.width}`,
                                    "x-device-id": deviceId,
                                },
                                body: JSON.stringify({
                                    order_id: response.razorpay_order_id,
                                    payment_id : response.razorpay_payment_id, 
                                    signature: response.razorpay_signature,
                                }),
                                credentials: "include"
                            });

                            const beResponse = await result.json();
                            if (!result.ok) throw new Error(beResponse.message);

                            
                        } catch (err) {
                            console.log("Error in payment verification", err);

                            setOrderPlaceLoading(false);
                        }
                    }
                };

                console.log("options", options)

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (err) {
                console.log("Error in creating order", err);
                setOrderPlaceLoading(false);
            }
        } else if (paymentMethod === "COD") {
            try {
                const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payments/order`, {
                    method: "POST",
                    headers: {
                        "x-identifier": import.meta.env.VITE_HASHED_IDENTIFIER,
                        "Content-Type": "application/json",
                        "x-user-agent": navigator.userAgent,
                        "x-language": navigator.language,
                        "x-resolution": `${screen.height}x${screen.width}`,
                        "x-device-id": deviceId,
                    },
                    body: JSON.stringify({
                        items: cart,
                        address: deliveryAddress,
                        distance: deliveryKilometers,
                        billing: {
                            itemsTotal: totalItemCost,
                            deliveryFee: deliveryCharge,
                            GST: gst,
                            packaging: 35,
                            platformFee: 5,
                            cashHandlingFee: 10,
                            grandTotal: payableAmount,
                        },

                        payment: {
                            method: "COD",
                            status: "PENDING",
                        },
                        orderStatus: "PLACED",
                    }),
                    credentials: "include"
                });

                const order = await result.json();
                if (!result.ok) throw new Error(order.message);

                setOrderPlaceLoading(false);
                setOrderPlaced(true);

                dispatch(setItemToCart({ mode: "initial", object: {} }));
            } catch (err) {
                console.log("Error in placing order", err);
                setOrderPlaceLoading(false);
            }
        }
    }

    useEffect(() => {
        const gst = calBilling({
            dispatch,
            cartItems,
            setItemsTotalCost,
            setGSTAndOtherCharges,
            setPayableAmount
        })

        setGst(gst);
    }, [cart]);

    useEffect(() => {
        function resizeHandler() {
            if (window.innerWidth <= 768) {
                setSmallScreen(true);
            } else {
                setSmallScreen(false);
            }
        }

        resizeHandler();

        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, [])

    return <div className="rounded-md dark:bg-gray-300 bg-white p-2 md:self-start">
        {orderPlaced && <div className="fixed top-0 bottom-0 left-0 h-full w-full flex items-center justify-center bg-green-500 max-lg:z-[100]">
            <div>
                <Lottie
                    animationData={successAnimation}
                    loop={false}
                    onComplete={() => {
                        if (smallScreen) navigate("/ordersAndWishlist", { replace: true });
                        else navigate("/profile", { replace: true })
                    }}
                    style={{ width: 300, height: 300 }}
                />
                <p className="text-4xl font-semibold text-white text-center -mt-4">Order Placed!</p>
            </div>
        </div>}
        <div
            className="h-full w-full flex flex-col gap-4"
        >
            <div className="text-sm">
                <div className="flex justify-between py-1">
                    <span className="text-gray-600 dark:text-gray-950">Item Total</span>
                    <span className="text-gray-700 dark:text-black font-semibold">₹{totalItemCost}</span>
                </div>

                <div className="flex justify-between py-1 pt-1.5 border-dashed">
                    <span className="text-gray-600 dark:text-gray-950">GST & Other Charges</span>
                    <span className="text-gray-700 dark:text-black font-semibold">₹{GSTAndOtherCharges}</span>
                </div>

                {(deliveryCharge !== 0 && deliveryKilometers !== 0) && <div className="flex justify-between items-center py-1">
                    <p className="text-gray-600 flex items-center gap-0.5">
                        <span className="dark:text-gray-950">Delivery Fee</span>
                        <span className="dark:text-gray-950">┃</span>
                        <span className="dark:text-gray-950">{deliveryKilometers} kms</span>
                        <i
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenDeliveryInfo(!openDeliveryInfo);
                            }}
                            className={`${openDeliveryInfo ? "ri-close-circle-fill" : "ri-information-2-line"
                                } cursor-pointer text-[16px] text-black ml-0.5 relative`}
                            onMouseEnter={() => setOpenDeliveryInfo(true)}
                            onMouseLeave={() => setOpenDeliveryInfo(false)}
                        >

                            <div
                                onClick={(e) => e.stopPropagation()}
                                id="delivery_dropdown"
                                className="absolute -top-[325%] -left-[130%] h-[4.2rem] w-48 rounded-md p-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] bg-white z-20"
                                style={{
                                    display: openDeliveryInfo ? "block" : "none",
                                }}
                            >
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="relative h-full"
                                >
                                    <div className="font-sans">
                                        <div className="flex items-center font-normal grow-0 justify-between text-xs text-gray-600">
                                            <p className="text-black font-semibold">Delivery Fee</p>
                                            <p className="font-semibold text-black">₹{deliveryCharge}</p>
                                        </div>
                                        <p className="text-[12px] tracking-wide mt-1 text-gray-700">
                                            Calculated based on distance: ₹10 base + ₹5/km after 1 km
                                        </p>
                                    </div>
                                    <div className="absolute top-[115%] left-3.5 bottom-full h-0 w-0 border-t-8 border-t-white border-l-8 border-r-8 border-r-transparent border-l-transparent"></div>
                                </div>
                            </div>
                        </i>
                    </p>
                    <span className="text-gray-700 dark:text-black font-semibold">₹{deliveryCharge}</span>
                </div>}

                {paymentMethod === "COD" && <div className="flex justify-between py-1 pt-1.5 border-t-[1px] border-dashed mt-1.5">
                    <span className="text-gray-600 dark:text-gray-950">Payment Handling Charge</span>
                    <span className="text-gray-700 dark:text-black font-semibold">+ ₹10</span>
                </div>}

                <div className="flex justify-between py-2 border-t mt-2 pt-2">
                    <span className="text-black font-bold">Total Amount</span>
                    <span className="text-black font-bold">₹{payableAmount}</span>
                </div>
            </div>
            <>
                {(Object.keys(deliveryAddress).length === 0 || paymentMethod === "")
                    && <p className="text-red-500 text-sm">Please complete your delivery and payment details to proceed.</p>}
                <button onClick={checkoutClickHandler} className={`${(Object.keys(deliveryAddress).length === 0 || paymentMethod === "") ? "bg-gray-400 text-gray-700 border border-gray-700" : "bg-green-400 text-white"} w-full h-9 rounded  font-sans font-medium tracking-wide cursor-pointer text-center ${!(Object.keys(deliveryAddress).length === 0 || paymentMethod === "") && "active:scale-95"} transform transition-all duration-150 flex items-center justify-center`}>
                    {orderPlaceLoading ? <DotBounceLoader /> : "Place Order"}
                </button>
            </>
        </div>
    </div>
}

export default FinalBilling;