const PureVeg = ({ classes }) => (
  <span
    className={`flex w-fit flex-row items-center gap-1.5 rounded-2xl border border-green-600 bg-gray-100 px-2 lg:my-1 dark:bg-gray-800/80 ${classes}`}
  >
    <i className="fas fa-leaf text-green-600 dark:text-green-400"></i>
    <p className="text-sm font-semibold text-green-600 dark:text-green-400">
      Pure Veg
    </p>
  </span>
);

export default PureVeg;
