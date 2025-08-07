import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { selectLatAndLng } from "../../features/home/homeSlice";
import MobileFooterMenu from "../Footer/MobileFooterMenu";
import GeoLocation from "../Location/GeoLocation";
import Billing from "./Billing";
import { useSelector } from "react-redux";


const PaymentsAndAddress = () => {
    const [searchParams] = useSearchParams();
    const [latRestro, lngRestro] = searchParams.get("restroDemographics").split(",")
    const { lat, lng} = useSelector(selectLatAndLng);

    const [overflowing, setOverflowing] = useState(false);
    const [latDelivery, setLatDelivery] = useState(lat)
    const [lngDelivery, setLngDelivery] = useState(lng);

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

    return <main className={`lg:pt-28 pt-20 w-full min-h-[110%] ${!overflowing && "h-full"} dark:bg-black bg-gray-200`} >
        <div className="w-full flex flex-col max-md:gap-3 md:flex-row justify-between md:max-w-[1070px] max-md:px-1.5 pb-20 mx-auto md:px-3">
            <section className="md:basis-[59%] flex flex-col gap-2 dark:bg-gray-300 bg-white">

            </section>
            <section className="rounded-md md:basis-[39%] dark:bg-gray-300 bg-white p-2 md:p-5 md:self-start">
                <div className="rounded overflow-hidden bg-gray-100 dark:bg-gray-800 pb-3">
                    <div className="px-2 py-2 w-full bg-primary dark:bg-darkPrimary">
                        <h2 className="text-white text-xl">CURRENT LOCATION</h2>
                    </div>
                    <div className=" w-[90%] mx-auto items-center px-2 py-3">
                        <div
                            // onClick={handleLocation}
                            className={`group cursor-pointer border-[1px] border-gray-400 active:border-primary py-2 px-3 md:py-2 md:px-5`}
                        >
                            {
                                <div className="flex gap-2.5">
                                    <i className="ri-crosshair-2-line text-xl text-gray-500 dark:text-gray-300"></i>
                                    <div>
                                        <p className="font-medium dark:text-gray-200 group-hover:text-primary group-active:text-primary text-lg">
                                            Use my current location
                                        </p>
                                        <p className="text-sm font-semibold text-gray-400 tracking-wide">Using GPS</p>
                                    </div>
                                </div>}
                        </div>
                    </div>

                    <div className="bg-white p-5 w-[86%] mx-auto rounded">

                    </div>
                </div>

                <div className="rounded overflow-hidden mt-4">
                    <div className=" w-fully">
                        <h2 className="text-gray-800 text-xl">Final Billing</h2>
                    </div>
                    <Billing heading={false} checkout={true} latDelivery={latDelivery} lngDelivery={lngDelivery}/>
                </div>
                
            </section>
        </div>
        <MobileFooterMenu />
    </main>
}

export default PaymentsAndAddress