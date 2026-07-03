import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setDeliveryAddress,
  setDeliveryLat,
  setDeliveryLng,
  selectDeliveryAddress,
  setDeliveryCharge,
} from '../../features/delivery/deliverySlice';

import haversineFormula from './../../utils/haversineFormula';
import { useLazyLocationByCoordinatesQuery } from '../../features/home/searchApiSlice';
import { selectUserDetails } from '../../features/home/homeSlice';
import { setIsDeliverable } from '../../features/delivery/deliverySlice';
import { CircleCheckBig } from 'lucide-react';

const CurrentLocation = ({ latRestro, lngRestro }) => {
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
  const [deliveryToCurrentLocation, setDeliveryToCurrentLocation] =
    useState(true);
  const [currentDelivery, setCurrentDelivery] = useState({});
  const [trigger] = useLazyLocationByCoordinatesQuery();
  const userDetails = useSelector(selectUserDetails);
  const deliverAt = useSelector(selectDeliveryAddress);
  const dispatch = useDispatch();

  const getCurrentLatLong = (method) => {
    setCurrentLocationLoading(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      if (method) method(lat, lng);
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      const call = (lat, lng) => {
        const distance = haversineFormula(latRestro, lat, lngRestro, lng);

        if (distance > 10) {
          setCurrentLocationLoading(false);
          setDeliveryToCurrentLocation(false);
        } else {
          setCurrentLocationLoading(false);
          setDeliveryToCurrentLocation(true);
          dispatch(setIsDeliverable(true));
        }
      };

      getCurrentLatLong(call);
    }
  }, []);

  const getCurrentLocation = () => {
    if (!deliveryToCurrentLocation) return;
    if (currentLocationLoading) return;
    if (navigator.geolocation) {
      const call = async (lat, lng) => {
        const distance = haversineFormula(latRestro, lat, lngRestro, lng);

        if (distance > 10) {
          setCurrentLocationLoading(false);
          setDeliveryToCurrentLocation(false);
          dispatch(setIsDeliverable(false));

          return;
        } else {
          try {
            const result = await trigger({
              lat1: lat,
              lng1: lng,
            }).unwrap();

            // console.log(result);

            const mainData = result.data[0].address_components;
            const deliverAt = {
              userName: userDetails.userName,
              userPhone: userDetails.userPhone,
              flatNumber: mainData[0].long_name,
              locality: mainData[1].long_name,
              district: mainData[2].long_name,
              state: mainData[4].long_name,
              country: mainData[5].long_name,
              pinCode: mainData[6].long_name,
              latLong: { lat, lng },
            };

            setCurrentDelivery(deliverAt);
            dispatch(setDeliveryAddress(deliverAt));
            setCurrentLocationLoading(false);
            dispatch(setDeliveryCharge(distance.toFixed(2)));
            dispatch(setDeliveryLat(lat));
            dispatch(setDeliveryLng(lng));
          } catch (err) {
            console.log(
              'Error fetching location data. Please try again later.',
              err,
            );
            setCurrentLocationLoading(false);
          }
        }
      };

      getCurrentLatLong(call);
    }
  };

  return (
    <div className="overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
      <div className="bg-primary dark:bg-darkPrimary w-full px-2 py-2">
        <h2 className="text-lg text-white">CURRENT LOCATION</h2>
      </div>
      <div className="mx-auto w-[90%] items-center overflow-hidden px-2 py-3">
        <div
          onClick={getCurrentLocation}
          className={`group relative border-[1px] border-black dark:border-gray-400 ${deliveryToCurrentLocation && 'active:border-primary cursor-pointer'} px-3 py-2 md:px-5 md:py-2`}
        >
          {(!deliveryToCurrentLocation || currentLocationLoading) && (
            <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black/60 dark:bg-gray-400/60">
              {currentLocationLoading ? (
                <div className="border-t-primary h-7 w-7 animate-spin rounded-full border-4 border-white" />
              ) : (
                <p className="font-semibold text-white select-none">
                  Not deliverable
                </p>
              )}
            </div>
          )}

          <div className="flex gap-2.5">
            <i
              className={`ri-crosshair-2-line text-xl text-gray-500 ${deliveryToCurrentLocation && 'group-hover:text-primary'} dark:text-gray-300`}
            ></i>
            <div>
              <p
                className={`font-medium dark:text-gray-200 ${deliveryToCurrentLocation && 'group-hover:text-primary group-active:text-primary'} text-lg select-none`}
              >
                Use my current location
              </p>
              <p className="text-sm font-semibold tracking-wide text-gray-400 select-none">
                Using GPS
              </p>
            </div>
          </div>
        </div>
      </div>

      {Object.keys(currentDelivery).length !== 0 && (
        <div className="px-2.5 py-1 pb-2">
          <p className="font-semibold tracking-wide dark:text-gray-200">
            {currentDelivery.userName}
          </p>
          <p className="whitespace-normal dark:text-gray-300">
            {currentDelivery.flatNumber}, {currentDelivery.locality},{' '}
            {currentDelivery.district}.
          </p>
          <p className="dark:text-gray-300">{`${currentDelivery.state}, ${currentDelivery.pinCode}, ${currentDelivery.country}.`}</p>
          <div className="flex items-center gap-2">
            <p className="dark:text-gray-300">{currentDelivery.userPhone}</p>
            {deliverAt?.latLong?.lat === currentDelivery?.latLong?.lat &&
              deliverAt?.latLong?.lng === currentDelivery?.latLong?.lng && (
                <div className="flex items-center gap-1">
                  <CircleCheckBig
                    size={16}
                    strokeWidth={3}
                    className="p-0 text-lg text-green-500"
                  />
                  <span className="font-sans text-sm font-semibold tracking-wider text-green-500">
                    Deliver here
                  </span>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentLocation;
