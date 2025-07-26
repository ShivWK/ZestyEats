import { Ham } from "lucide-react";

const VegAndNonVeg = ({ classes }) => (
  <span
    className={`items-center gap-1.5 dark:bg-gray-800/80 bg-gray-100 text-xs font-medium rounded-full border border-gray-300 w-fit text-gray-700 ${classes}`}
  >
    <i className="fas fa-leaf dark:text-green-400 text-green-600"></i>
    <span className="text-green-700 dark:text-green-400 font-semibold text-sm">Veg</span>
    <span className="dark:text-gray-200 text-sm">&</span>
    <Ham size={16} className="text-red-600 transform rotate-180" />
    <span className="text-red-500 dark:text-red-600 font-semibold text-sm">Non-Veg</span>
  </span>
);

export default VegAndNonVeg;
