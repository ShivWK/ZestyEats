import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addCurrentRestaurant } from "../../features/home/restaurantsSlice";
import { Copy, CheckCheck, ChevronDown, Store } from "lucide-react";
import { useState } from "react";
import calFinalPrice from "../../utils/calFinalPrice";
import VegSvg from "../../utils/VegSvg";
import NonVegSvg from "../../utils/NonVegSvg";
import BillingCard from "./BillingCard";
import AddressCard from "./AddressCard";

const OrderCard = ({ data, orderId }) => {
    const [copied, setCopied] = useState(false);
    const [openDetails, setOPendDetails] = useState(false);

    const mainData = Object.values(data.items);
    const dataToMap = mainData.map(items => ({ item: items.item, quantity: items.quantity }));
    const restaurantMetadata = mainData[0].restaurantData.metadata || mainData[0].restaurantData;

    // console.log("Main data", mainData)
    // console.log("metadata data", restaurantMetadata);
    // console.log("given data", data)

    const dispatch = useDispatch();

    const [lat, lng] = restaurantMetadata.latLong.split(",");

    const id = restaurantMetadata.id;
    const name = restaurantMetadata.name;

    const areaName = restaurantMetadata.areaName;
    const locality = restaurantMetadata.locality;
    let areaOrLocality = locality + ", " + areaName;

    if (areaName === locality) areaOrLocality = locality;

    const citySmall = restaurantMetadata?.slugs?.city;
    const city = citySmall[0].toUpperCase() + citySmall.slice(1) + ".";

    const ClickHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        dispatch(addCurrentRestaurant(name));
    };

    const copyClickHandler = async () => {
        try {
            await navigator.clipboard.writeText(orderId);
            setCopied(true);

            setTimeout(() => {
                setCopied(false)
            }, 5000)
        } catch (err) {
            console.log("Failed to copy", err);
        }
    }

    const giveHumanReadableDate = (dateString) => {
        const date = new Date(dateString);

        const inIndianTime = date.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

        return inIndianTime;
    }

    return <div className="bg-white dark:bg-gray-300 rounded-t-md p-2">
        <div className="w-full flex flex-col gap-1">
            <Link
                to={`/restaurantSpecific/${lat}/${lng}/${id}/${name}`}
                onClick={ClickHandler}
                className="group flex items-center gap-1"
            >
                <Store size={20} strokeWidth={2} />
                <p className="basis-[95%] truncate text-xl font-bold select-none">
                    {name}
                </p>
                <i className="basis-[4%] ri-arrow-right-long-fill text-2xl text-gray-800 cursor-pointer transform group-hover:translate-x-[6px] transition-all duration-200 ease-in-out p-0 ml-auto"></i>
            </Link>

            <p className="text-sm font-bold dark:text-gray-900 text-gray-700 truncate -mt-1 capitalize">
                {areaOrLocality + ", " + city}
            </p>

            <hr className="text-gray-500 my-1" />
        </div>

        <div className="mt-2">
            <h2 className="flex items-center gap-1 text-sm text-gray-600 tracking-wider font-semibold">
                <span>Order ID:</span>
                <span>{`#${orderId}`}</span>
                {
                    copied ? <CheckCheck size={17} strokeWidth={3} className="ml-1 text-green-400" /> : <button onClick={copyClickHandler}><Copy size={15} strokeWidth={3} className="ml-1" /></button>
                }
            </h2>

            <div className="flex flex-col justify-center gap-1.5 mt-3 mb-1">
                {dataToMap.map(item => {
                    const price = calFinalPrice({ quantity: item.quantity, item: item.item });

                    return <div className="flex items-center gap-2 w-full">
                        {item.item?.itemAttribute?.vegClassifier === "VEG" ? <VegSvg /> : <NonVegSvg />}
                        <span className="text-sm text-black line-clamp-2 w-[78%]">
                            {
                                `${item.quantity} x ${item.item.name}`
                            }
                        </span>
                        {openDetails && <span className="ml-auto text-sm font-bold">
                            {`₹${price}`}
                        </span>}
                    </div>
                })}
            </div>

            {!openDetails && <div className="flex justify-between items-center mt-3 text-sm">
                <span className="text-gray-600 tracking-wider font-semibold">{`Placed on: ${giveHumanReadableDate(data.createdAt)}`}</span>
                <span className="py-1 px-2 rounded-md bg-primary dark:bg-darkPrimary text-white font-semibold tracking-wider">{`₹${data.billing.grandTotal}`}</span>
            </div>}

            <button
                onClick={() => setOPendDetails(!openDetails)}
                className={`px-4 py-0.5 rounded-md bg-primary dark:bg-darkPrimary text-white font-bold tracking-wider mx-auto flex items-center gap-1.5 ${openDetails ? "mt-4" : "mt-2"}`}
            >
                <span>Details</span>

                <ChevronDown size={15} strokeWidth={4} className={`transform p-0 m-0 transition-all duration-200 ease-linear ${openDetails && "-rotate-180"}`} />
            </button>

            <div className={`mt-1 flex flex-col gap-1 ${openDetails ? "h-auto" : "h-0"} overflow-hidden`}>
                <hr className="text-gray-500 my-3 mt-4" />
                <BillingCard data={data} />
                <hr className="text-gray-500 my-3 mt-4" />
                <AddressCard data={data} />
            </div>
        </div>
    </div>
}

export default OrderCard;