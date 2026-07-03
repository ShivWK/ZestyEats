// Done

import { setFavoriteRestaurant } from '../../features/home/restaurantsSlice';
import { useDispatch } from 'react-redux';

const NotAvailableCardOverlay = ({ disable, lat, lng, dataToMap }) => {
  // console.log("NotAvailableCardOverlay rendered")
  const dispatch = useDispatch();

  const crossHandler = () => {
    dispatch(setFavoriteRestaurant({ lat, lng, data: dataToMap }));
  };

  return (
    <div
      className={`absolute z-20 ${
        disable ? 'flex' : 'hidden'
      } h-full w-full items-center justify-center rounded-xl bg-[rgba(0,0,0,0.4)] dark:bg-gray-300/25`}
    >
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-3xl font-bold text-white dark:text-white">
          Not Available
        </p>
        <i
          onClick={crossHandler}
          className="ri-close-large-line rounded bg-black/50 px-1 text-3xl text-white dark:bg-gray-950/60 dark:text-white"
        ></i>
      </div>
    </div>
  );
};

export default NotAvailableCardOverlay;
