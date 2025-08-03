import { useSearchParams, useNavigate, Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import ScooterAnimation from "../../utils/ScooterAnimation";
import ProfileResponseShimmer from "./ProfileResponseShimmer";
import MobileFooterMenu from "../Footer/MobileFooterMenu";

const MainContent = ({ mainData }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode");

    console.log(mainData)

    return <>
        <main className="pt-14 h-full overflow-x-hidden">
            <section className="relative px-3 pt-5 pb-2 dark:bg-gray-800 bg-primary rounded-b-3xl profile-animation overflow-hidden h-28">
                <i
                    onClick={() => navigate(-1)}
                    className="ri-arrow-left-long-line text-2xl text-white font-medium"
                />
                <h1 className="text-2xl text-white dark:text-gray-100 text-shadow-2xs mt-0.5">{mode}</h1>
            </section>
            <div className="my-4">
                <ScooterAnimation />
            </div>
        </main>
        {mode === "Logout Options"
            ? ("")
            : mode === "Saved Address"
                ? ""
                : ""
        }

        <MobileFooterMenu />
    </>
}

const MobileProfileResponse = () => {
    const loaderData = useLoaderData();

    return <Suspense fallback={<ProfileResponseShimmer />}>
        <Await resolve={loaderData.data}>
            {(data) => <MainContent mainData={data} />}
        </Await>
    </Suspense>

}

export default MobileProfileResponse;