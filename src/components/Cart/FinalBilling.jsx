import { selectFinalBilling } from "../../features/delivery/deliverySlice";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectDeliveryAddress, selectPaymentMethod } from "../../features/delivery/deliverySlice";

const FinalBilling = () => {
    const {
        totalItemCost,
        deliveryCharge,
        deliveryKilometers,
        GSTAndOtherCharges,
        payableAmount
    } = useSelector(selectFinalBilling);

    const deliveryAddress = useSelector(selectDeliveryAddress);
    const paymentMethod = useSelector(selectPaymentMethod);

    const [openDeliveryInfo, setOpenDeliveryInfo] = useState(false);

    const checkoutClickHandler = (e) => {
        if (Object.keys(deliveryAddress).length === 0 || paymentMethod === "") {
            e.preventDefault();
        }

        if (paymentMethod === "Online") {
            
        }
    }

    return <div className="rounded-md dark:bg-gray-300 bg-white p-2 md:self-start">
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
                <Link onClick={checkoutClickHandler} className={`${(Object.keys(deliveryAddress).length === 0 || paymentMethod === "") ? "bg-gray-400 text-gray-700 border border-gray-700" : "bg-green-400 text-white"} py-1.5 lg:py-1 rounded  font-sans font-medium tracking-wide cursor-pointer text-center ${!(Object.keys(deliveryAddress).length === 0 || paymentMethod === "") && "active:scale-95"} transform transition-all duration-150`}>Place Order</Link>
            </>
        </div>
    </div>
}

export default FinalBilling;