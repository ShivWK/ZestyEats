const VegAndNonVeg = ({ classes }) => (
  <span
    className={`items-center gap-1.5 dark:bg-gray-800/80 bg-gray-100 text-xs font-medium rounded-full border border-gray-300 w-fit text-gray-700 ${classes}`}
  >
    {/* Veg Icon - Leaf */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="green"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      className="dark:text-green-400"
    >
      <path d="M12 2C10 8 8 10 2 12c8 0 10 2 12 10 0-8 2-10 10-12-6 0-8-2-10-10z" />
    </svg>
    <span className="text-green-700 dark:text-green-400">Veg</span>
    <span className="dark:text-gray-200">&</span>
    {/* Non-Veg Icon - Drumstick */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="brown"
      viewBox="0 0 24 24"
      width="14"
      height="14"
    >
      <path d="M20.285 3.714a6 6 0 00-8.485 0l-1.172 1.172a6.003 6.003 0 00-1.414 6.828l-7.07 7.07a3 3 0 104.242 4.242l7.07-7.07a6.003 6.003 0 006.828-1.414l1.172-1.172a6 6 0 000-8.485z" />
    </svg>
    <span className="text-red-500">Non-Veg</span>
  </span>
);

export default VegAndNonVeg;
