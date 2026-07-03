import {
  selectSearchedCity,
  selectYourCurrentCity,
} from '../features/home/homeSlice';
import { useSelector } from 'react-redux';
import Breadcrumbs from './Breadcrumbs';

const BreadcrumbsWrapper = ({
  normalTextColor,
  mainTextColor,
  delimiterColor,
}) => {
  const currentCity = useSelector(selectYourCurrentCity);
  const searchedCity = useSelector(selectSearchedCity);

  return (
    <div
      className={`flex items-center gap-1 ${delimiterColor} hide-scrollbar w-full overflow-auto text-xs font-semibold`}
    >
      <p className="font-bold whitespace-nowrap select-none dark:text-white">{`${currentCity || searchedCity}`}</p>
      <span className="dark:text-white">┃</span>
      <Breadcrumbs textColor={normalTextColor} mainTextColor={mainTextColor} />
    </div>
  );
};

export default BreadcrumbsWrapper;
