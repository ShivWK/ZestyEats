import { selectUserDetails } from "../features/home/homeSlice";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import MobileFooterMenu from "./Footer/MobileFooterMenu";
import ScooterAnimation from "./../utils/ScooterAnimation";

const MobileProfile = () => {
    const userDetails = useSelector(selectUserDetails);
    const navigate = useNavigate();

    return <main className="pt-14 overflow-hidden h-full">
        <section className="relative px-3 pt-5 pb-2 dark:bg-gray-800 bg-primary rounded-b-3xl h-44 profile-animation overflow-hidden">
            <i onClick={() => navigate(-1)} className="ri-arrow-left-long-line text-2xl text-white font-medium"></i>
            <div className="flex items-center justify-between mt-7">
                <div>
                    <h1 className="text-2xl text-white dark:text-gray-100 text-shadow-2xs">Shivendra Dwivedi</h1>
                    <div className="flex items-center gap-1 ">
                        <p className="font-medium text-gray-100 dark:text-gray-200">7897532327</p>
                        <Link className=" dark:text-primary text-blue-600 tracking-wide font-[500]"><i className="ri-information-2-line"></i></Link>
                    </div>
                    <div className="flex items-center gap-1 ">
                        <p className="font-medium text-gray-100 dark:text-gray-200 -mt-1 tracking-wide">shivendra@shivendra.site</p>
                        <Link className="mb-0.5 dark:text-primary text-blue-600 tracking-wide font-[500]"><i className="ri-information-2-line"></i></Link>
                    </div>
                </div>
                <button className="px-5 py-1 rounded-md font-sans font-bold tracking-wide text-white bg-blue-600">
                    Edit
                </button>
            </div>
        </section>
        <div className="my-4">
            <ScooterAnimation />
        </div>
        <section className="mx-auto w-[90%] rounded-2xl p-2 bg-primary dark:bg-gray-800">
            <div className="flex gap-2 items-center p-2 border-b-2 border-b-white">
                <i className="fas fa-credit-card text-gray-100 dark:text-primary text-xl"></i>
                <p className="text-white dark:text-gray-100">Payments</p>
                <i class="ri-arrow-right-s-line ml-auto text-xl text-gray-100 dark:text-primary"></i>
            </div>
            <div className="flex gap-2 items-center p-2 border-b-2 border-b-white">
                <i className="ri-map-pin-user-fill text-gray-100 text-xl dark:text-primary"></i>
                <p className="text-white dark:text-gray-100">Addresses</p>
                <i class="ri-arrow-right-s-line ml-auto text-xl text-gray-100 dark:text-primary"></i>
            </div>
            <div className="flex gap-2 items-center p-2">
                <i className="ri-logout-circle-r-line text-gray-100 text-xl dark:text-primary"></i>
                <p className="text-white dark:text-gray-100">Logout</p>
                <i class="ri-arrow-right-s-line ml-auto text-xl text-gray-100 dark:text-primary"></i>
            </div>
        </section>
        <MobileFooterMenu />
    </main>
}

export default MobileProfile;

