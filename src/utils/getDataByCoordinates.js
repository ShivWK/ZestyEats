import { updateCurrentCity } from './addCurrentCity';
import { updateHomeRestaurantData } from './updateHomeData';
import { setLocationInfoModal, setLocationInfoModalReason } from '../features/Login/loginSlice';

export async function getDataByCoordinates(lat, lng, dispatch, triggerLocationByCoordinates, triggerHomeAPI) {
    try {
        const data = await triggerLocationByCoordinates({
            lat,
            lng,
        }).unwrap();

        updateCurrentCity(data, dispatch);

        const latNew = data?.data?.[0]?.geometry?.location?.lat;
        const lngNew = data?.data?.[0]?.geometry?.location?.lng;

        console.log("New lat lng", latNew, lngNew)

        try {
            const res2 = await triggerHomeAPI({ lat: latNew, lng: lngNew }).unwrap();
            updateHomeRestaurantData(res2, dispatch, latNew, lngNew);
        } catch (err) {
            console.error('ERROR in fetching data', err);
            dispatch(setLocationInfoModalReason('error'));
            dispatch(setLocationInfoModal(true));
        }
    } catch (err) {
        console.log('Error in fetching current location data.', err);
        dispatch(setLocationInfoModalReason('error'));
        dispatch(setLocationInfoModal(true));
    }
}