import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <main className="flex flex-col px-3 justify-center items-center h-full gap-3.5">
            <div className="flex flex-col gap-3 items-center justify-center">
               <img className="h-52 w-56 rounded-xl" src="/images/404.jpg" alt="" />
               <p className="text-5xl">🍽️</p>
                <p className="text-2xl text-gray-700 font-bold">404 Opps! Page not found</p>
                <p className="text-xl text-gray-500 font-medium text-center">The page you are looking doesn't exist or was moved.</p>
            </div>
            <Link
                to="/"
                className="px-4 py-2 hover:bg-primary hover:text-white font-semibold rounded-md bg-gray-200 text-black border-[1px] hover:border-primary border-gray-400 transition-all duration-100 ease-linear active:scale-95"
            >
                Go to Home
            </Link>
        </main>
    );
};

export default PageNotFound;
