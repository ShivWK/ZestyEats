import { selectFavoriteRestros } from "../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";
import Cards from "../Home/Cards";

const FavoriteRestros = () => {
    const restaurants = useSelector(selectFavoriteRestros);

    return <div className="flex dark:bg-gray-800 justify-between flex-wrap gap-3 p-1 my-2">
        { restaurants.length !== 0 
        ? restaurants.map(data => <Cards key={data.data.id} data={data} from="chain" />)
        : <p className="mx-auto text-gray-700 font-semibold dark:text-gray-200 my-3">No favorite restaurants</p>
    }
    </div>
}

export default FavoriteRestros;

