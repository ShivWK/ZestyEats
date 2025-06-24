import { memo } from "react";
import { NavLink } from "react-router-dom";
import { selectLatAndLng } from "../../../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentFoodCategory } from "../../../features/header/headerSlice";

const Cards = memo(({ data }) => {
  const { lat, lng } = useSelector(selectLatAndLng);
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
    <NavLink to={path} onClick={handleClick} className="shrink-0 w-28 md:w-36">
      <img
        className="w-full h-32 my-3 md:my-2 md:h-44 rounded object-cover"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/${data?.imageId}`}
        alt={data?.accessibility?.altText}
      />
    </NavLink>
  );
});

export default Cards;

