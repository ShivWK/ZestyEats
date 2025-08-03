import {
  useSearchParams,
  useNavigate,
  Await,
  useLoaderData,
} from "react-router";
import { Suspense, useState } from "react";
import ScooterAnimation from "../../utils/ScooterAnimation";
import ProfileResponseShimmer from "./ProfileResponseShimmer";
import MobileFooterMenu from "../Footer/MobileFooterMenu";
import DotBounceLoader from "./../../utils/DotBounceLoader"

const MainContent = ({ mainData }) => {
    const [deleteLoading, setDeleteLoading] = useState(true)
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  let currentActiveSession = null;
  let otherActiveSessions = null;

  console.log(mainData);

  if (mode === "Logout Options") {
    currentActiveSession = mainData.data?.find(
      (session) => session.activeNow === true
    );
    otherActiveSessions = mainData.data?.filter(
      (session) => session.activeNow === false
    );

    console.log("current", currentActiveSession);
    console.log("other", otherActiveSessions);
  }

  const extractLastActive = (data) => {
    const date = new Date(data);

    const inIndianTime = date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return inIndianTime;
  };

  const deleteHandler = (sessionId) => {
    try {

    } catch {

    }
  }

  return (
    <>
      <main className="pt-14 h-full overflow-x-hidden">
        <section className="relative px-3 pt-5 pb-2 dark:bg-gray-800 bg-primary rounded-b-3xl profile-animation overflow-hidden h-28">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-long-line text-2xl text-white font-medium"
          />
          <h1 className="text-2xl text-white dark:text-gray-100 text-shadow-2xs mt-0.5">
            {mode}
          </h1>
        </section>
        <div className="my-4">
          <ScooterAnimation />
        </div>
        {mode === "Logout Options" ? (
          <div className="bg-gray-100 pb-3 dark:bg-gray-800 rounded-md overflow-hidden w-[95%] mx-auto">
            <div>
              <div className="px-1 py-2 w-full bg-primary dark:bg-darkPrimary">
                <h2 className="text-white text-xl">CURRENT DEVICE</h2>
              </div>
              <div className="flex justify-between items-center px-2 py-4">
                <div>
                  <p className="block dark:text-gray-200">
                    {currentActiveSession.data.browserName.replace(
                      /\b\w/g,
                      (word) => word.toUpperCase()
                    )}
                    {` Browser`}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 font-bold text-sm flex items-center gap-2">
                    <span>
                      {currentActiveSession.data.oSName.toUpperCase()}
                    </span>
                    <span className="text-black dark:text-gray-300">•</span>
                    <span className="font-normal text-green-600">
                      {" "}
                      Active now
                    </span>
                  </p>
                </div>
                <button className="bg-primary dark:bg-darkPrimary px-3 py-1 rounded text-xs font-semibold tracking-wide text-white">
                  LOGOUT
                </button>
              </div>
              {otherActiveSessions.length !== 0 && (
                <div>
                  <div className="px-1 py-2 w-full bg-primary dark:bg-darkPrimary">
                    <h2 className="text-white text-xl">OTHER LOGGED DEVICE</h2>
                  </div>
                  {otherActiveSessions.map((session, index) => {
                    return (
                      <div
                        className="px-2 py-4 border-b-2 rounded border-gray-800 dark:border-gray-400"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="block dark:text-gray-200">
                              {session.data.browserName.replace(
                                /\b\w/g,
                                (word) => word.toUpperCase()
                              )}
                              {` Browser`}
                            </p>
                            <button className={`bg-primary flex items-center justify-center self-start dark:bg-darkPrimary ${deleteLoading ? "px-5 py-0.5" : "px-3 py-1"} rounded text-xs font-semibold tracking-wide text-white`}>
                              {deleteLoading ? <DotBounceLoader /> : "LOGOUT"}
                            </button>
                          </div>

                          <p className="text-gray-500 dark:text-gray-400 font-bold text-sm flex items-center gap-1.5 mt-1">
                            <span className="tracking-wide">
                              {session.data.oSName.toUpperCase()}
                            </span>
                            <span className="text-black dark:text-gray-300">
                              •
                            </span>
                            <span className="font-normal text-green-600 whitespace-nowrap">
                              {" "}
                              Last active on
                            </span>
                            <span className="whitespace-nowrap">
                              {extractLastActive(session.lastActive)}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {otherActiveSessions.length !== 0 && (
              <button className="bg-primary mx-auto block dark:bg-darkPrimary px-3 py-1 rounded text-sm font-semibold tracking-wide text-white mt-5">Logout of All Devices</button>
            )}
          </div>
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
