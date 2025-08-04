import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { selectDeviceFingerPrint } from "../../features/home/homeSlice";
import LogoutButton from "./LogoutButton";

const Logout = ({ mainData }) => {
    const [currentActiveSession, setCurrentActiveSession] = useState({});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [otherActiveSessions, setOtherActiveSessions] = useState([]);
    const deviceFingerPrint = useSelector(selectDeviceFingerPrint);
    const dispatch = useDispatch();

    useEffect(() => {
        const ActiveSession = mainData.data?.find(
            (session) => session.activeNow === true
        );

        setCurrentActiveSession(ActiveSession);

        const otherSessions = mainData.data?.filter(
            (session) => session.activeNow === false
        );

        setOtherActiveSessions(otherSessions);
    }, [])


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

    const deleteHandler = async (sessionId, index, type) => {
        setDeleteLoading(true);
        try {
            const result = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/userActivity/logout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-device-id": deviceFingerPrint,
                        "x-user-agent": navigator.userAgent,
                    },
                    body: JSON.stringify({
                        id: sessionId,
                    }),
                    credentials: "include",
                }
            );

            const data = await result.json();

            if (!result.ok) throw new Error(data.message);

            console.log(data);

            if (type === "other") {
                setOtherActiveSessions((prv) => {
                    const update = [...prv];
                    update.splice(index, 1);

                    return update;
                });
            } else {
                window.location.href = "/";
                dispatch(setIsLoggedIn(false));
                dispatch(setIsLoggedInHome(false));
                dispatch(setIsLoggedInRestro(false));
            }
            setDeleteLoading(false);
        } catch (err) {
            console.log("Error in logout", err);

            toast.error("Can't logout. Please try after sometime", {
                autoClose: 3000,
                style: {
                    backgroundColor: "rgba(0,0,0,0.9)",
                    fontWeight: "medium",
                    color: "white",
                },
            });
            setDeleteLoading(false);
        }
    };

    return <div
        className={`bg-gray-100 ${otherActiveSessions.length !== 0 && "pb-3"
            } dark:bg-gray-800 rounded-md overflow-hidden w-[95%] mx-auto`}
    >
        <div>
            <div className="px-1 py-2 w-full bg-primary dark:bg-darkPrimary">
                <h2 className="text-white text-xl">CURRENT DEVICE</h2>
            </div>
            <div className="flex justify-between items-center px-2 py-4">
                <div>
                    <p className="block dark:text-gray-200">
                        {currentActiveSession?.data?.browserName.replace(
                            /\b\w/g,
                            (word) => word.toUpperCase()
                        )}
                        {` Browser`}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 font-bold text-sm flex items-center gap-2">
                        <span>
                            {currentActiveSession?.data?.oSName.toUpperCase()}
                        </span>
                        <span className="text-black dark:text-gray-300">•</span>
                        <span className="font-normal text-green-600">
                            {" "}
                            Active now
                        </span>
                    </p>
                </div>
                {/* <button onClick={() => deleteHandler(currentActiveSession?.id, null, "current")} className="bg-primary dark:bg-darkPrimary px-3 py-[0.300rem] rounded text-xs font-semibold tracking-wide text-white transform active:scale-95 transition-all duration-75 ease-in-out">
                    LOGOUT
                </button> */}
                <LogoutButton sessionId={currentActiveSession?.id} type="current" />
            </div>
            {otherActiveSessions.length !== 0 && (
                <div>
                    <div className="px-1 py-2 w-full bg-primary dark:bg-darkPrimary">
                        <h2 className="text-white text-xl">OTHER LOGGED DEVICE</h2>
                    </div>
                    {otherActiveSessions.map((session, index) => {
                        return (
                            <div key={index} className="px-2 py-4 border-b-2 rounded border-gray-800 dark:border-gray-400">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <p className="block dark:text-gray-200">
                                            {session.data.browserName.replace(
                                                /\b\w/g,
                                                (word) => word.toUpperCase()
                                            )}
                                            {` Browser`}
                                        </p>
                                        {/* <button
                                            onClick={() => deleteHandler(session.id, index, "other")}
                                            className={`bg-primary flex items-center justify-center self-start dark:bg-darkPrimary ${deleteLoading
                                                ? "px-5 py-0.5"
                                                : "px-3 py-[0.300rem]"
                                                } rounded text-xs font-semibold tracking-wide text-white transform active:scale-95 transition-all duration-75 ease-in-out`}
                                        >
                                            {deleteLoading ? <DotBounceLoader /> : "LOGOUT"}
                                        </button> */}

                                        <LogoutButton
                                            sessionId={session.id}
                                            index={index}
                                            type="other"
                                            otherActiveSessionSetter={setOtherActiveSessions}
                                        />
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
            <button className="bg-primary mx-auto block dark:bg-darkPrimary px-3 py-1 rounded text-sm font-semibold tracking-wide text-white mt-5 transform active:scale-95 transition-all duration-75 ease-in-out">
                Logout of All Devices
            </button>
        )}
    </div>
}

export default Logout