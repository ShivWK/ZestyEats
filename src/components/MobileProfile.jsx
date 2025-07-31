import { selectUserDetails } from "../features/home/homeSlice";
import { useSelector } from "react-redux";

const MobileProfile = () => {
    const userDetails = useSelector(selectUserDetails);

    return <main className="pt-14">
        <section className="flex items-center px-3 justify-between bg-primary/70 rounded-b-3xl profile-animation overflow-hidden">
            <div>
                <h1 className="text-2xl text-white text-shadow-2xs">Shivendra Dwivedi</h1>
                <p className="font-semibold text-gray-200">7897532327</p>
                <p className="font-semibold text-gray-800 -mt-1 tracking-wide">shivendra@shivendra.site</p>
            </div>
            <button className="px-3 py-0.5 rounded-md font-bold tracking-wide text-white bg-blue-600">
                Edit
            </button>
        </section>
    </main>
}

export default MobileProfile;

