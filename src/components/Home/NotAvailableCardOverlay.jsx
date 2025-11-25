// Done

import { setFavoriteRestaurant } from "../../features/home/restaurantsSlice";
import { useDispatch } from "react-redux";

const NotAvailableCardOverlay = ({ disable, lat, lng, dataToMap }) => {
    // console.log("NotAvailableCardOverlay rendered")
    const dispatch = useDispatch()

    const crossHandler = () => {
        dispatch(setFavoriteRestaurant({ lat, lng, data: dataToMap }));
    };

    return (
        <div
            className={`absolute z-20 ${disable ? "flex" : "hidden"
                } items-center justify-center rounded-xl h-full w-full dark:bg-gray-300/25 bg-[rgba(0,0,0,0.4)]`}
        >
            <div className="flex flex-col gap-1 items-center justify-center">
                <p className="text-white font-bold text-3xl dark:text-white">Not Available</p>
                <i
                    onClick={crossHandler}
                    className="ri-close-large-line dark:text-white text-white text-3xl rounded px-1 dark:bg-gray-950/60 bg-black/50"
                ></i>
            </div>
        </div>
    )
}

export default NotAvailableCardOverlay;