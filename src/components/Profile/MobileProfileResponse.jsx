import {
    useSearchParams,
    useNavigate,
    Await,
    useLoaderData,
} from "react-router";

import { useSelector } from "react-redux";

import { Suspense } from "react";
import ScooterAnimation from "../../utils/ScooterAnimation";
import ProfileResponseShimmer from "./ProfileResponseShimmer";
import MobileFooterMenu from "../Footer/MobileFooterMenu";
import Logout from "./Logout";
import { selectIsLoggedIn } from "../../features/Login/loginSlice";
import UnauthorizedError from "../ErrorHandling/UnauthorizedError";

const MainContent = ({ mainData }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode");

    // console.log(mainData);

    if (!isLoggedIn) return <UnauthorizedError />

    return (
        <>
            <main className="pt-14 pb-20 h-full overflow-x-hidden">
                <section className="relative px-3 pt-5 pb-2 dark:bg-gray-800 bg-primary rounded-b-3xl profile-animation overflow-hidden h-28">
                    <i
                        onClick={() => navigate(-1)}
                        className="ri-arrow-left-long-line text-2xl text-white font-medium"
                    />
                    <h1 className="text-2xl text-white dark:text-gray-100 text-shadow-2xs mt-2">
                        {mode}
                    </h1>
                </section>
                <div className="my-4">
                    <ScooterAnimation />
                </div>
                {mode === "Logout Options" ? (
                    <Logout mainData={mainData} />
                ) : mode === "Saved Address" ? (
                    ""
                ) : (
                    ""
                )}
            </main>
            <MobileFooterMenu />
        </>
    );
};

const MobileProfileResponse = () => {
    const loaderData = useLoaderData();

    return (
        <Suspense fallback={<ProfileResponseShimmer />}>
            <Await resolve={loaderData.data}>
                {(data) => <MainContent mainData={data} />}
            </Await>
        </Suspense>
    );
};

export default MobileProfileResponse;
