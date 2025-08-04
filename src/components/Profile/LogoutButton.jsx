import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDeviceFingerPrint, setIsLoggedInHome } from "../../features/home/homeSlice";
import { setIsLoggedIn } from "../../features/Login/loginSlice";
import { setIsLoggedInRestro } from "../../features/home/restaurantsSlice";
import DotBounceLoader from "../../utils/DotBounceLoader";
import { toast } from "react-toastify";

const LogoutButton = ({ sessionId, index = null, type, otherActiveSessionSetter = null }) => {
    const deviceFingerPrint = useSelector(selectDeviceFingerPrint);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);


    const deleteHandler = async (sessionId, index, type) => {
        setIsLoading(true);
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
                otherActiveSessionSetter((prv) => {
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
            setIsLoading(false);
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
            setIsLoading(false);
        }
    };

    return <button
        onClick={() => deleteHandler(sessionId, index, type)}
        className={`bg-primary flex items-center justify-center self-start dark:bg-darkPrimary ${isLoading
            ? "px-5 py-0.5"
            : "px-3 py-[0.300rem]"
            } rounded text-xs font-semibold tracking-wide text-white transform active:scale-95 transition-all duration-75 ease-in-out`}
    >
        {isLoading ? <DotBounceLoader /> : "LOGOUT"}
    </button>
}

export default LogoutButton;