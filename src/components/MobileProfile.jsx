import { selectUserDetails } from "../features/home/homeSlice";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const MobileProfile = () => {
    const userDetails = useSelector(selectUserDetails);
    const navigate = useNavigate();

    return <main className="pt-14">
        <section className="relative px-3 pt-5 pb-2 dark:bg-gray-800 bg-primary rounded-b-3xl h-40 profile-animation overflow-hidden">
            <i onClick={() => navigate(-1)} className="ri-arrow-left-long-line text-2xl text-white font-medium"></i>
            <div className="flex items-center justify-between mt-2.5">
                <div>
                    <h1 className="text-2xl text-white dark:text-gray-100 text-shadow-2xs">Shivendra Dwivedi</h1>
                    <div className="flex items-center gap-0.5 ">
                        <p className="font-medium text-gray-100 dark:text-gray-200">7897532327</p>
                        <Link className="text-sm dark:text-primary text-blue-600 tracking-wide font-[500]"><i className="ri-information-2-line"></i></Link>
                    </div>
                    <div className="flex items-center gap-0.5 ">
                        <p className="font-medium text-gray-100 dark:text-gray-200 -mt-1 tracking-wide">shivendra@shivendra.site</p>
                        <Link className="text-sm mb-0.5 dark:text-primary text-blue-600 tracking-wide font-[500]"><i className="ri-information-2-line"></i></Link>
                    </div>
                </div>
                <button className="px-5 py-1 rounded-md font-sans font-bold tracking-wide text-white bg-blue-600">
                    Edit
                </button>
            </div>
        </section>
    </main>
}

export default MobileProfile;

