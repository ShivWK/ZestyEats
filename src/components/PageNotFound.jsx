import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-3.5 px-3">
      <div className="flex flex-col items-center justify-center gap-3">
        <img className="h-52 w-56 rounded-xl" src="/images/404.jpg" alt="" />
        <p className="text-5xl">🍽️</p>
        <p className="text-2xl font-bold text-gray-700 dark:text-white">
          404 Opps! Page not found
        </p>
        <p className="text-center text-xl font-medium text-gray-500 dark:text-gray-300">
          The page you are looking doesn't exist or was moved.
        </p>
      </div>
      <Link
        to="/"
        className="hover:bg-primary hover:border-primary mt-2 rounded-md border-[1px] border-gray-400 bg-gray-200 px-4 py-1 font-medium text-black transition-all duration-100 ease-linear hover:text-white active:scale-95"
      >
        Go to Home
      </Link>
    </main>
  );
};

export default PageNotFound;
