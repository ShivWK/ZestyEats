import Construction from "../../utils/Construction";
import { selectCart } from "../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectLatAndLng } from "../../features/home/homeSlice";
import { Rotate3D } from "lucide-react";
import haversineFormula from "./../../utils/haversineFormula";

const Billing = () => {
    const cart = useSelector(selectCart);
    const { lat: latCurrent, lng: lngCurrent } = useSelector(selectLatAndLng);

    const [totalAmount, setTotalAmount] = useState(0);
    const [GST, setGST] = useState(0);
    const [distance, setDistance] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(30)

    const [openInfo, setOpenInfo] = useState(false);

    const packagingCharge = 35;
    const platformFee = 5;

    const [GSTAndOther, setGSTAndOther] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0)

    useEffect(() => {
        const cartItem = Object.values(cart);
        const [latRestro, lngRestro] = cartItem[0].restaurantData.metadata?.latLong.split(",") ||
            cartItem[0].restaurantData.latLong.split(",");

        const distance = (haversineFormula(latRestro, latCurrent, lngRestro, lngCurrent)).toFixed(2);
        setDistance(distance);

        //base delivery fee = 10 for within and upto 1 km, and 5 per km after 1 km.
        const deliveryFee = 10 + Math.max(0, Math.floor(distance - 1)) * 5;
        setDeliveryFee(deliveryFee);

        const total = cartItem.reduce((acc, { item, quantity }) => {
            const defaultPrice = item?.price / 100 || item?.defaultPrice / 100 || 0;
            const finalPrice = item?.finalPrice / 100;
            let price = +(finalPrice || defaultPrice).toFixed(2);

            return acc + quantity * price;
        }, 0)

        setTotalAmount(total);
    }, [cart])

    useEffect(() => {
        const gstAmount = totalAmount * 0.05;
        setGST(gstAmount);

        const GSTAndOther = +(gstAmount + packagingCharge + platformFee).toFixed(2);
        setGSTAndOther(GSTAndOther);

        const grandTotalAmount = +(totalAmount + GSTAndOther + deliveryFee).toFixed(2);
        setGrandTotal(grandTotalAmount);
    }, [totalAmount])

    const [couponsOpen, setCouponsOpen] = useState(false);
    const [coupon, setCoupon] = useState("");

    const handlerCouponClick = (e) => {
        e.stopPropagation();
        setCouponsOpen(!couponsOpen)
    }

    const containerClickHandler = () => {
        setCouponsOpen(false);
        setOpenInfo(false)
        console.log("Call")
    }

    return <section className="rounded-md md:basis-[39%] bg-white p-2 md:p-5">
        <div onClick={containerClickHandler} className="h-full w-full flex flex-col gap-4">
            <h2 className="font-sans text-xl font-semibold underline underline-offset-4">Bill Details</h2>
            <div onClick={handlerCouponClick} id="coupon" className="flex items-center justify-between px-3 h-14 border-[1px] border-dashed cursor-pointer">
                <div className="flex items-center gap-3">
                    <i className="ri-discount-percent-fill text-4xl font-extralight"></i>
                    {coupon ? <p className="font-bold text-gray-500">{coupon}</p>
                        : <p>Apply Coupon</p>}
                </div>
                <i className="fa-solid fa-caret-down  text-black transform transition-transform duration-200 ease-linear" style={{
                    transform: couponsOpen && "rotate(-180deg)"
                }}></i>
            </div>
            <div className={`-mt-3 bg-gray-200 rounded-md ${couponsOpen ? "h-18" : "h-0"} transition-all duration-150 ease-linear`}></div>

            <div className="text-sm">
                <div className="flex justify-between py-1">
                    <span className="text-gray-600">Item Total</span>
                    <span className="text-gray-700 font-semibold">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between py-1">
                    <p className="text-gray-600 flex items-center gap-0.5">
                        <span>Delivery Fee</span>
                        <span>┃</span>
                        <span>{distance} kms</span>
                    </p>
                    <span className="text-gray-700 font-semibold">₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between py-1 pt-1.5 border-t-[1px] mt-2 border-gray-400 border-dashed">
                    <div className="relative flex gap-1 items-center">
                        <span className="text-gray-600">GST & Other Charges</span>
                        <i onClick={(e) => {
                            e.stopPropagation()

                            // if (window.innerWidth > 768) return;
                            setOpenInfo(!openInfo)
                            console.log("Cll")
                        }}
                            className={`${openInfo ? "ri-close-circle-fill" : "ri-information-2-line"} cursor-pointer text-[16px]`}
                            onMouseEnter={() => setOpenInfo(true)}
                            onMouseLeave={() => setOpenInfo(false)}
                        />

                        <div onClick={(e) => e.stopPropagation()} id="dropdown" className="absolute -top-[520%] left-3/4 h-28 w-40 rounded-md p-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] bg-white" style={{
                            display: openInfo ? "block" : "none"
                        }}>
                            <div onClick={(e) => e.stopPropagation()} className="relative h-full">
                                <p className="break-words text-xs">Shivendra Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, recusandae!</p>
                                <div className="absolute top-[108%] left-3.5 bottom-full h-0 w-0 border-t-8 border-t-white border-l-8 border-r-8 border-r-transparent border-l-transparent"></div>
                            </div>
                        </div>
                    </div>
                    <span className="text-gray-700 font-semibold">₹{GSTAndOther}</span>
                </div>
                <div className="flex justify-between py-2 border-t mt-2 pt-2">
                    <span className="text-black font-bold">Total Amount</span>
                    <span className="text-black font-bold">₹{grandTotal}</span>
                </div>
            </div>
        </div>
    </section>
}

export default Billing;