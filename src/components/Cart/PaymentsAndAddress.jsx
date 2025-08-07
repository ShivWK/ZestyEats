import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { selectLatAndLng } from "../../features/home/homeSlice";
import MobileFooterMenu from "../Footer/MobileFooterMenu";
import GeoLocation from "../Location/GeoLocation";
import Billing from "./Billing";
import { useSelector } from "react-redux";
import haversineFormula from "./../../utils/haversineFormula";


const PaymentsAndAddress = () => {
    const [searchParams] = useSearchParams();
    const [latRestro, lngRestro] = searchParams.get("restroDemographics").split(",")
    const { lat, lng } = useSelector(selectLatAndLng);

    const [overflowing, setOverflowing] = useState(false);
    const [latDelivery, setLatDelivery] = useState(lat)
    const [lngDelivery, setLngDelivery] = useState(lng);
    const [isDeliverable, setIsDeliverable] = useState(true);
    // const [distance, setDistance] = useState(0);

    useEffect(() => {
        const checkOverflow = () => {
            const htmlELe = document.documentElement;
            const clientHeight = htmlELe.clientHeight;
            const scrollHeight = htmlELe.scrollHeight;

            if (scrollHeight > clientHeight) {
                setOverflowing(true);
            } else {
                setOverflowing(false);
            }
        }

        checkOverflow();

        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [document.documentElement.scrollHeight]);

    useEffect(() => {
        const distance = haversineFormula(latRestro, latDelivery, lngRestro, lngDelivery);

        if (distance > 10) setIsDeliverable(false)
        else setIsDeliverable(true);
        // setDistance(distance.toFixed(2));

    }, [latDelivery, lngDelivery, latRestro, lngRestro]);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            
        }
    }

    return <main className={`lg:pt-28 pt-20 w-full min-h-[110%] ${!overflowing && "h-full"} dark:bg-black bg-gray-200`} >
        <div className="w-full flex flex-col max-md:gap-3 md:flex-row justify-between md:max-w-[1070px] max-md:px-1.5 pb-20 mx-auto md:px-3">
            <section className="md:basis-[59%] flex flex-col gap-2 dark:bg-gray-300 bg-white rounded">
                <div className="p-2 w-fit mx-auto">
                    <p className="inline font-medium">Delivery Status: </p>
                    {isDeliverable ? (
                        <div className="inline-flex items-center gap-1">
                            <p className="text-green-600 dark:text-green-600 font-medium">
                                Delivering to your area.
                            </p>
                            <i className="fas fa-shipping-fast text-black mt-0.5"></i>
                        </div>
                    ) : (
                        <>
                            <p className="text-red-500 font-medium dark:text-darkPrimary inline">
                                Not delivering to your area. Please select different address.{" "}
                            </p>
                            <div className="relative inline-flex gap-1.5 items-center">
                                <div id="No delivery" className="relative mt-0.5">
                                    <i className="fas fa-shipping-fast text-black"></i>
                                    <div className="absolute ml-2 rounded bottom-0 h-6 w-0.5 bg-red-500 transform rotate-45"></div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
            <section className="rounded-md md:basis-[39%] dark:bg-gray-300 bg-white p-2 md:p-5 md:self-start">
                <div className="rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <div className="px-2 py-2 w-full bg-primary dark:bg-darkPrimary">
                        <h2 className="text-white text-xl">CURRENT LOCATION</h2>
                    </div>
                    <div className=" w-[90%] mx-auto items-center px-2 py-3">
                        <div
                            onClick={getCurrentLocation}
                            className={`group cursor-pointer border-[1px] border-gray-400 active:border-primary py-2 px-3 md:py-2 md:px-5`}
                        >
                            {
                                <div className="flex gap-2.5">
                                    <i className="ri-crosshair-2-line text-xl text-gray-500 group-hover:text-primary dark:text-gray-300"></i>
                                    <div>
                                        <p className="font-medium dark:text-gray-200 group-hover:text-primary group-active:text-primary text-lg select-none">
                                            Use my current location
                                        </p>
                                        <p className="text-sm font-semibold select-none text-gray-400 tracking-wide">Using GPS</p>
                                    </div>
                                </div>}
                        </div>
                    </div>

                    {/* <div className="bg-white p-5 w-[86%] mx-auto rounded mb-3">

                    </div> */}
                </div>

                <div className="rounded overflow-hidden mt-4">
                    <div className=" w-fully">
                        <h2 className="text-gray-800 text-xl">Final Billing</h2>
                    </div>
                    <Billing heading={false} checkout={true} latDelivery={latDelivery} lngDelivery={lngDelivery} isDeliverable={isDeliverable} />
                </div>

            </section>
        </div>
        <MobileFooterMenu />
    </main>
}

export default PaymentsAndAddress