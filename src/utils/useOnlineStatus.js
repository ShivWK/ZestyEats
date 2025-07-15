import { useState, useEffect } from "react";
import { setOnline } from "../features/home/homeSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const dispatch = useDispatch();

    useEffect(() => {
        const onlineHandler = () => {
            setIsOnline(true);
            dispatch(setOnline(true));
            toast("Back Online", {
                autoClose: 2000,
                style: {
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    fontWeight: "bold",
                    color: "white",
                },
                progressClassName: "progress-style",
            });
        };

        const offlineHandler = () => {
            setOnline(false);
            dispatch(setOnline(false));
            toast("Lost Connection", {
                autoClose: 2000,
                style: {
                    backgroundColor: "rgba(0,0,0,0.9)",
                    fontWeight: "bold",
                    color: "white",
                },
                // progressClassName: "progress-style"
            });
        };

        window.addEventListener("online", onlineHandler);
        window.addEventListener("offline", offlineHandler);

        toast.info("Still building — features may not work as expected.", {
            autoClose: 4000,
            style: {
                background: "rgba(0,0,0,0.9)",
                color: "white",
                fontWeight: "medium",
            },
            progressClassName: "progress-style-disclaimer",
        });

        return () => {
            window.removeEventListener("online", onlineHandler);
            window.removeEventListener("offline", offlineHandler);
        };
    }, []);

    return isOnline;
}

export default useOnlineStatus;