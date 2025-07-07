import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <main className="flex flex-col px-3 justify-center items-center h-full gap-3.5">
            <div className="flex flex-col gap-3 items-center justify-center">
               <h1 className="text-8xl md:text-9xl text-primary">404</h1>
               <p className="text-5xl">🍽️</p>
                <p className="text-2xl text-gray-700 font-bold">Opps! Page not found</p>
                <p className="text-xl text-gray-500 font-semibold text-center">The page you are looking doesn't exist or was moved.</p>
            </div>
            <Link
                to="/"
                className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-gray-200 hover:text-black border-[1px] border-primary hover:border-gray-400 transition-all duration-100 ease-linear active:scale-95"
            >
                Go to Home
            </Link>
        </main>
    );
};

export default PageNotFound;
