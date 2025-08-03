import MobileFooterMenu from "../Footer/MobileFooterMenu";
import ScooterAnimation from "../../utils/ScooterAnimation";

const ProfileResponseShimmer = () => {
    return <main className="pt-14 overflow-x-hidden h-full pb-20">
        <section className="relative px-3 pt-5 pb-2 border border-gray-500 rounded-b-3xl profile-animation overflow-hidden h-28">
            <div className="w-7 h-4 rounded shimmerBg" />
            <div className="w-[70%] h-7 rounded mt-4 shimmerBg" />
        </section>
        <div className="my-4">
            <ScooterAnimation />
        </div>

        <MobileFooterMenu />
    </main>
}

export default ProfileResponseShimmer;