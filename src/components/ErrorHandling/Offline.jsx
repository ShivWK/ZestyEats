import { useNavigate } from "react-router-dom";

const Offline = () => {
    const navigate = useNavigate();

     return (
        <main className="flex flex-col px-3 justify-center items-center h-full gap-3.5">
            <div className="flex flex-col gap-3 items-center justify-center">
                <img className="h-72 w-72 rounded-xl" src="/images/noInternet3.jpg" alt="" />
                <p className="text-2xl text-gray-700 font-bold">You're Offline</p>
                <p className="text-xl text-gray-500 font-medium text-center">Please check your internet connection.</p>
            </div>
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
        </main>
    );
};

export default Offline;
