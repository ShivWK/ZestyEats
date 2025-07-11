import { useEffect, useState } from "react";
import haversineFormula from "./haversineFormula";
import { useSelector } from "react-redux";
import { selectLatAndLng } from "../features/home/homeSlice";
import { useLazyGetSpecificRestaurantDataQuery } from "../features/home/restaurantsApiSlice";

const useCheckStatus = (lat, lng, restaurant_id) => {
    const { lat: latCurrent, lng: lngCurrent } = useSelector(selectLatAndLng);
    const [trigger] = useLazyGetSpecificRestaurantDataQuery();
    const [status, setStatus] = useState({ opened: true, isDeliverable: true, loading: true });

    useEffect(() => {
        const check = async () => {
            try {
                const data = await trigger({ lat, lng, id: restaurant_id }).unwrap();
                const info = data.data.cards[2].card.card.info;

                const opened = info?.availability?.opened;
                const [latRestro, lngRestro] = info?.latLong?.split(",") || [];
                
                // console.log(latRestro, latCurrent, lngRestro, lngCurrent)

                let distance = haversineFormula(latRestro, latCurrent, lngRestro, lngCurrent);
                const isDeliverable = distance <= 10;
                
                // console.log(opened, isDeliverable, distance.toFixed(2))
                distance = distance.toFixed(2)
                setStatus({opened, isDeliverable, loading: false, distance})
            } catch (err) {
                console.log("Some error occurred while checking the status", err);
                setStatus({opened: true, isDeliverable: true, loading: false})
            }
        }

        if (lat && lng && restaurant_id) check();

    }, [lat, lng, restaurant_id, latCurrent, lngCurrent])

    return status;
}

export default useCheckStatus;