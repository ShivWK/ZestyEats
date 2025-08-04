import MobileFooterMenu from "../Footer/MobileFooterMenu";
import ScooterAnimation from "../../utils/ScooterAnimation";
import DotBounceLoader from "../../utils/DotBounceLoader";

const ProfileResponseShimmer = () => {
    return <main className="pt-14 overflow-x-hidden h-full pb-20">
        <section className="relative mx-auto px-3 mt-8 p-3 w-[95%] border border-gray-500 rounded-2xl overflow-hidden ">
            <div className="w-7 h-4 rounded shimmerBg" />
            <div className="w-[70%] h-7 rounded mt-4 shimmerBg" />
        </section>
        <div className="my-4">
            <ScooterAnimation />
        </div>

        <div className="w-[95%] flex flex-col gap-4 mx-auto">
            <div className="border flex flex-col gap-3 border-gray-500 rounded-md p-2" > 
                <div className="shimmerBg rounded w-[80%] h-5"></div>
                <div className="shimmerBg rounded w-[70%] h-5"></div>
                <div className="flex justify-between items-center w-full">
                    <div className="h-5 shimmerBg w-[40%]"></div>
                    <div className="h-5 shimmerBg w-[20%]"></div>
                </div>
            </div>

            <div className="border flex flex-col gap-3 border-gray-500 rounded-md p-2" > 
                <div className="shimmerBg rounded w-[80%] h-5"></div>
                <div className="shimmerBg rounded w-[70%] h-5"></div>
                <div className="flex justify-between items-center w-full">
                    <div className="h-5 shimmerBg w-[40%]"></div>
                    <div className="h-5 shimmerBg w-[20%]"></div>
                </div>
            </div>

            <div className="border flex flex-col gap-3 border-gray-500 rounded-md p-2" > 
                <div className="shimmerBg rounded w-[80%] h-5"></div>
                <div className="shimmerBg rounded w-[70%] h-5"></div>
                <div className="flex justify-between items-center w-full">
                    <div className="h-5 shimmerBg w-[40%]"></div>
                    <div className="h-5 shimmerBg w-[20%]"></div>
                </div>
            </div>
        </div>

        <DotBounceLoader />

        <MobileFooterMenu />
    </main>
}

export default ProfileResponseShimmer;