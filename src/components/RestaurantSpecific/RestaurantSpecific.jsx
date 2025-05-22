import { useParams } from "react-router-dom";
import store from "../../app/store";
import restaurantsApi from "../../features/home/restaurantsApiSlice";

export const loader = async ({ params }) => {
  const { lat, lng, id } = params;

  const result = await store.dispatch(
    restaurantsApi.endpoints.getSpecificRestaurantData.initiate({
      lat,
      lng,
      id,
    })
  );

  console.log(result?.data?.data?.cards);
};

const RestaurantSpecific = () => {
  const routeParams = useParams();

  return (
    <div className="pt-24 border-2 mx-auto w-full max-w-[800px]">
      <p>Hi I'm restaurant</p>
      <div className="bg-linear-[to_left,rgba(255,81,0,0.15),#ffffff]">
        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_86,h_30/v1634558776/swiggy_one/OneLogo_3x.png" alt="" />
      </div>
      <p>{`lat = ${routeParams.lat} and lng = ${routeParams.lng} and id = ${routeParams.id}`}</p>
      <button className="fixed bottom-3.5 right-72 h-[12vh] w-[12vh] rounded-[50%] bg-black text-white text-xs font-bold shadow-[0_0_10px_5px_rgba(0,0,0,0.4)] cursor-pointer">
        MENU
      </button>
    </div>
  );
};

export default RestaurantSpecific;
