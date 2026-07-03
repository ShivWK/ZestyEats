import {
  setHideLocationInfoModal,
  setLocationInfoModal,
  selectLocationInfoModal,
  setLocationModal,
  selectLocationInfoModalReason,
  setLocationInfoModalReason,
  selectGrantBtnClicked,
  setGrantBTnClicked,
} from '../../features/Login/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyLocationByCoordinatesQuery } from '../../features/home/searchApiSlice';
import { useLazyGetHomePageDataQuery } from '../../features/home/homeApiSlice';
import { updateHomeRestaurantData } from '../../utils/updateHomeData';
import { updateSearchedCity } from '../../utils/addSearchedCity';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { updateCurrentCity } from '../../utils/addCurrentCity';
import fetchHomeData from '../../services/homeService';
import { defaultPlaces } from '../../utils/constants';

const LocationInfoModal = () => {
  const dispatch = useDispatch();
  const { hideLocationInfoModal } = useSelector(selectLocationInfoModal);
  const reasonOfOpening = useSelector(selectLocationInfoModalReason);
  const [triggerHomeAPI] = useLazyGetHomePageDataQuery();
  const [triggerLocationByCoordinates] = useLazyLocationByCoordinatesQuery();
  const [shouldOpenLocationModal, setShouldOpenLocationModal] = useState(false);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const locationInfoModalRef = useRef(null);
  const grantBtnClicked = useSelector(selectGrantBtnClicked);

  const permissionGrantHandler = () => {
    setIsUserInteracted(true);
    dispatch(setGrantBTnClicked(true));
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat1 = position.coords.latitude;
        const lng1 = position.coords.longitude;

        try {
          const data = await triggerLocationByCoordinates({
            lat1,
            lng1,
          }).unwrap();

          updateCurrentCity(data, dispatch);

          const lat = data?.data?.[0]?.geometry?.location?.lat;
          const lng = data?.data?.[0]?.geometry?.location?.lng;

          try {
            const res2 = await triggerHomeAPI({ lat, lng }).unwrap();
            updateHomeRestaurantData(res2, dispatch, lat, lng);
          } catch (err) {
            console.error('ERROR in fetching data', err);
            dispatch(setLocationInfoModalReason('error'));
            dispatch(setLocationInfoModal(true));
          }
        } catch (err) {
          console.log('Error fetching current location data.', err);
          dispatch(setLocationInfoModalReason('error'));
          dispatch(setLocationInfoModal(true));
        }
      },
      (err) => {
        if (err.code === err.TIMEOUT) {
          dispatch(setHideLocationInfoModal(false));
          dispatch(setLocationInfoModalReason('error'));
          dispatch(setLocationInfoModal(true));
        } else if (err.code === err.PERMISSION_DENIED) {
          dispatch(setHideLocationInfoModal(false));

          if (grantBtnClicked) {
            dispatch(setLocationInfoModalReason('error'));
            dispatch(setLocationInfoModal(true));
          } else {
            dispatch(setLocationInfoModalReason('permission'));
            dispatch(setLocationInfoModal(true));
          }
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          dispatch(setHideLocationInfoModal(false));
          dispatch(setLocationInfoModalReason('error'));
          dispatch(setLocationInfoModal(true));
        } else {
          dispatch(setHideLocationInfoModal(false));
          dispatch(setLocationInfoModalReason('error'));
          dispatch(setLocationInfoModal(true));
        }
      },
      {
        timeout: 5000,
        enableHighAccuracy: false,
        maximumAge: 20000,
      },
    );
  };

  const searchClickHandler = (e) => {
    e.stopPropagation();
    setIsUserInteracted(true);
    setShouldOpenLocationModal(true);
    dispatch(setHideLocationInfoModal(true));
  };

  const placeClickHandler = (data) => {
    setIsUserInteracted(true);

    const location = {
      terms: [
        { value: data.city },
        { value: data.location.split(', ')[0] },
        { value: data.location.split(', ')[1] },
      ],
    };

    updateSearchedCity(location, dispatch);
    fetchHomeData(triggerHomeAPI, dispatch, data.lat, data.lng);
  };

  const runOnAnimationEnd = (e) => {
    const classList = e.target.classList;

    if (classList.contains('hide-locationInfoModal')) {
      dispatch(setLocationInfoModal(false));

      if (classList.contains('open-location-modal')) {
        dispatch(setLocationModal(true));
        setShouldOpenLocationModal(false);
      }

      if (!isUserInteracted) {
        toast.info(
          'No location selected. Showing restaurants in Bangalore by default.',
          {
            autoClose: 2000,
            style: {
              backgroundColor: '#ff5200',
              fontWeight: 'semibold',
              color: 'white',
            },
            progressClassName: 'progress-style',
          },
        );
        placeClickHandler(defaultPlaces[1]);
      }
    }
  };

  const hideLocationInfoModalHandler = () =>
    dispatch(setHideLocationInfoModal(true));

  return (
    <div
      onClick={hideLocationInfoModalHandler}
      className="fixed inset-0 top-0 left-0 z-40 h-[100%] w-[100%] bg-black/30"
    >
      <div
        ref={locationInfoModalRef}
        role="dialog"
        aria-modal={true}
        onAnimationEnd={runOnAnimationEnd}
        className={`absolute left-1/2 block w-[90%] -translate-x-1/2 transform overflow-hidden rounded-xl bg-white font-sans tracking-wide lg:w-[30%] dark:bg-transparent ${
          hideLocationInfoModal
            ? 'hide-locationInfoModal'
            : 'show-locationInfoModal'
        } ${shouldOpenLocationModal && 'open-location-modal'}`}
      >
        <div className="bg-primary dark:bg-darkPrimary flex w-full items-center justify-between p-2 font-medium text-white">
          <p className="leading-5">
            {reasonOfOpening === 'permission'
              ? "Location blocked. Tap 'Grant' to get nearby results."
              : 'Location unavailable. Choose a city below or search to see results'}
          </p>
          {reasonOfOpening === 'permission' && (
            <button
              onClick={permissionGrantHandler}
              className="cursor-pointer rounded bg-blue-600 px-3 py-0.5 font-medium text-white shadow-[0_0_10px_2px_rgba(0,0,0,0.3)] transition-all duration-150 ease-in-out hover:bg-blue-700 active:scale-95"
            >
              Grant
            </button>
          )}
        </div>

        {/* default city options */}

        {defaultPlaces.map((data, index) => {
          return (
            <div
              key={index}
              onClick={() => placeClickHandler(data)}
              className={`group cursor-pointer ${index !== defaultPlaces.length - 1 && 'border-b-[1px]'} w-full border-gray-400 px-3 py-2 md:px-4 md:py-3 dark:border-gray-800 dark:bg-gray-300`}
            >
              <div className="relative flex w-full items-center gap-2.5">
                <i
                  className={`ri-map-pin-line text-xl text-gray-500 dark:text-gray-950`}
                ></i>
                <div className="flex w-full items-center gap-1.5">
                  <p className="group-hover:text-primary group-active:text-primary dark:group-active:text-darkPrimary line-clamp-2 leading-5 font-medium break-words dark:text-gray-950 dark:group-hover:text-red-500">
                    {data.city}
                  </p>
                  <span className="font-medium text-black">┃</span>
                  <p className="truncate text-sm font-medium tracking-wide text-gray-500 dark:text-gray-800">
                    {data.location + '.'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Search city */}

        <div
          onClick={searchClickHandler}
          className="flex w-full cursor-pointer items-center justify-between bg-gray-200 px-3 py-2 dark:bg-gray-800 dark:text-gray-200"
        >
          <p className="font-semibold">Search for a city</p>
          <i className="ri-search-2-line cursor-pointer text-xl"></i>
        </div>
      </div>
    </div>
  );
};
export default LocationInfoModal;
