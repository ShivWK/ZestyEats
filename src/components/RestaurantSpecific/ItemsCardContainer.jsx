import { useState, memo } from "react";
import ItemCard2 from "./ItemCard2";
import {
  selectVegOption,
  selectNonVegOption,
} from "../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";

const ItemsCardContainer = memo(({ item, isParentOpen }) => {
  const [isError, setIsError] = useState(false);
  const vegOption = useSelector(selectVegOption);
  const nonVegOption = useSelector(selectNonVegOption);
  const veg = item?.itemAttribute?.vegClassifier === "VEG";

  return veg ? (
    vegOption ? (
      <ItemCard2 item={item} isParentOpen={isParentOpen} />
    ) : null
  ) : nonVegOption ? (
    <ItemCard2 item={item} isParentOpen={isParentOpen}/>
  ) : null;
});

export default ItemsCardContainer;
