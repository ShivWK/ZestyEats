import { useState, useEffect, useRef } from "react";
import { setOnline } from "../features/home/homeSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const dispatch = useDispatch();
    const hasUserGoneOffline = useRef(false);

    const verifyConnection = () => {
                setIsOnline(true);
                dispatch(setOnline(true));

                if (hasUserGoneOffline.current) {
                    toast("Back Online", {
                        autoClose: 2000,
                        style: {
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            fontWeight: "bold",
                            color: "white",
                        },
                        progressClassName: "progress-style",
                    });
                }

                hasUserGoneOffline.current = false;
    };

    useEffect(() => {
        const onlineHandler = () => {
            verifyConnection();
        };

        const offlineHandler = () => {
            setIsOnline(false); 
            dispatch(setOnline(false));
            hasUserGoneOffline.current = true;

            toast("Lost Connection", {
                autoClose: 2000,
                style: {
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    fontWeight: "bold",
                    color: "white",
                },
            });
        };

        verifyConnection();

        window.addEventListener("online", onlineHandler);
        window.addEventListener("offline", offlineHandler);

        return () => {
            window.removeEventListener("online", onlineHandler);
            window.removeEventListener("offline", offlineHandler);
        };
    }, []);

    return isOnline;
};

export default useOnlineStatus;
