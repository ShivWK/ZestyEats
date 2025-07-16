import { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { selectLatAndLng } from "../../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentFoodCategory } from "../../../features/header/headerSlice";
import { selectCityLatAndLng, selectLocalityLatAndLng } from "../../../features/cityHome/cityHomeSlice";

const Cards = memo(({ data }) => {
  const [isError, setIsError] = useState(false)
  const pathname = useLocation().pathname;
  let latLngSelector = selectLatAndLng;

  if (pathname.includes("cityPage")) {
    latLngSelector = selectCityLatAndLng
  } else if (pathname.includes("cityLocality")) {
    latLngSelector = selectLocalityLatAndLng
  }

  const { lat, lng } = useSelector(latLngSelector);
  const dispatch = useDispatch();  
  const category = data?.action?.text;
  const link = data?.action?.link;
  const urlObj = new URL(link).searchParams;
  const collection_id = +urlObj.get("collection_id");
  const tags = urlObj.get("tags");
  const path = `/specificFood/${category}?lat=${lat}&lng=${lng}&collection_id=${collection_id}&tags=${tags}`;

  const handleClick = () => {
    dispatch(setCurrentFoodCategory(category));
  };

  return (
    <Link to={path} onClick={handleClick} className="shrink-0 w-28 max-md:pb-4 lg:w-36">
      <img
        className="w-full h-32 my-3 md:my-2 md:h-44 rounded object-cover"
        src={isError ? "/images/fallback.png" : `https://media-assets.swiggy.com/swiggy/image/upload/${data?.imageId}`}
        alt={data?.accessibility?.altText}
        onError={() => setIsError(true)}
      />
    </Link>
  );
});

export default Cards;

