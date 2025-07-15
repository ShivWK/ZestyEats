import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import Offline from "./Offline";
import useOnlineStatus from "../../utils/useOnlineStatus";
import { selectOnlineStatus } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";

const ErrorBoundary = () => {
    useOnlineStatus();
    const navigate = useNavigate();
    const error = useRouteError() // {status, error};
    const isOnline = useSelector(selectOnlineStatus);

    let message = "Something went wrong. Please try again.";

    const isDev = import.meta.env.DEV;

    if (!isOnline) return <Offline />

     return (
        <main className="flex flex-col px-3 justify-center items-center h-full gap-3">
            <div className="flex flex-col gap-3 items-center justify-center">
                <img className="h-72 lg:h-96 w-[97%] lg:w-4/5 rounded-xl" src="/images/error2.jpg" alt="" />
                <p className="text-2xl text-gray-700 font-bold -mt-6 lg:-mt-8 text-center">{message}</p>
                {isDev && <p className="text-xl text-gray-500 font-medium text-center -mt-2">{`status: ${error.status}, error: ${error.error}`}</p>}
            </div>
            <div className="flex gap-3 mt-2">
                <button
                onClick={() => navigate(-1)}
                className="px-4 py-1 hover:bg-primary hover:text-white font-medium rounded-md bg-gray-200 text-black border-[1px] hover:border-primary border-gray-400 transition-all duration-100 ease-linear active:scale-95"
            >
                Go to Back
            </button>
            <button
                onClick={() => window.location.reload()}
                className="px-4 py-1 hover:bg-primary hover:text-white font-medium rounded-md bg-gray-200 text-black border-[1px] hover:border-primary border-gray-400 transition-all duration-100 ease-linear active:scale-95">
                Reload
            </button>
            </div>
        </main>
    );
}

export default ErrorBoundary;