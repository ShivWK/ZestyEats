import { selectUserDetails } from "../features/home/homeSlice";
import { useSelector } from "react-redux";

const MobileProfile = () => {
    const userDetails = useSelector(selectUserDetails);

    return <main className="pt-14">
        <section className=" px-3 pt-5 pb-2 bg-primary/80 rounded-b-3xl profile-animation overflow-hidden">
            <i className="ri-arrow-left-long-line text-2xl"></i>
            <div className="flex items-center justify-between mt-2.5">
                <div>
                    <h1 className="text-2xl text-gray-100 dark:text-gray-100 text-shadow-2xs">Shivendra Dwivedi</h1>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">7897532327</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200 -mt-1 tracking-wide">shivendra@shivendra.site</p>
                </div>
                <button className="px-3 py-0.5 rounded-md font-sans font-bold tracking-wide text-white bg-blue-600">
                    Edit
                </button>
            </div>
        </section>
    </main>
}

export default MobileProfile;

