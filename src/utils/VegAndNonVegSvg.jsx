import { Ham } from 'lucide-react';

const VegAndNonVeg = ({ classes }) => (
  <span
    className={`flex w-fit items-center gap-1.5 rounded-2xl border border-green-600 bg-gray-100 px-2 lg:my-1 dark:bg-gray-800/80 ${classes}`}
  >
    <i className="fas fa-leaf text-green-600 dark:text-green-400"></i>
    <span className="text-sm font-semibold text-green-700 dark:text-green-400">
      Veg
    </span>
    <span className="text-sm dark:text-gray-200">&</span>
    <Ham size={16} className="rotate-180 transform text-red-600" />
    <span className="text-sm font-semibold text-red-500 dark:text-red-600">
      Non-Veg
    </span>
  </span>
);

export default VegAndNonVeg;
