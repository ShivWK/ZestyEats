import PlaceCards from "./PlaceCards";
import { useSelector } from "react-redux";
import { selectNearByRestaurants } from "../../features/home/homeSlice";

export default function NearByRestaurants() {
  const places = useSelector(selectNearByRestaurants);

  return (
    <>
      <h3 className="self-start">Explore Every Restaurants Near Me</h3>
      <div className="flex flex-wrap justify-start gap-y-5 gap-x-8">
        {places.map((item) => (
          <PlaceCards key={item.link} data={item} />
        ))}
      </div>
    </>
  );
}
