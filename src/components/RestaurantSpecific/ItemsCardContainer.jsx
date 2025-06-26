import { memo } from "react";
import ItemCard2 from "./ItemCard2";
import {
  selectVegVariant
} from "../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";

const ItemsCardContainer = memo(({ item, isParentOpen }) => {
  const { vegOption, nonVegOption } = useSelector(selectVegVariant)
  const veg = item?.itemAttribute?.vegClassifier === "VEG";

  if (!vegOption && veg) return;
  if (!nonVegOption && !veg) return;

  return <ItemCard2 item={item} isParentOpen={isParentOpen} />;
});

export default ItemsCardContainer;
