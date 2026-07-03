import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHomeRestaurantData } from '../utils/updateHomeData';
import { setHideLocation } from '../features/Login/loginSlice';
import { setLoading } from '../features/home/homeSlice';
import { useLazyGetHomePageDataQuery } from '../features/home/homeApiSlice';
import { selectLocationModal } from '../features/Login/loginSlice';

const useFetchDefaultHomeData = () => {
  const [triggerHomeAPI, { isLoading }] = useLazyGetHomePageDataQuery();
  const isLocationModelOpen = useSelector(selectLocationModal);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiResponse = await triggerHomeAPI({
          lat: 12.9715987,
          lng: 77.5945627,
        }).unwrap();
        
        if (!apiResponse) return;
        if (isLocationModelOpen) dispatch(setHideLocation(true));
        updateHomeRestaurantData(apiResponse, dispatch, 12.9715987, 77.5945627);
      } catch (err) {
        if (isLocationModelOpen) dispatch(setHideLocation(true));
        dispatch(setLoading(false));
        alert(err.error);
      }
    };

    fetchData();
  }, [isLocationModelOpen, dispatch, triggerHomeAPI]);

  return isLoading;
};

export default useFetchDefaultHomeData;