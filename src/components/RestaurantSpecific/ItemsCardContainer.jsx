import { useState, memo } from "react";
import ItemCard from "./ItemCard.jsx";
import {
  selectVegOption,
  selectNonVegOption,
} from "../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";

const ItemsCardContainer = memo(({ item }) => {
  const [isError, setIsError] = useState(false);
  const vegOption = useSelector(selectVegOption);
  const nonVegOption = useSelector(selectNonVegOption);
  const veg = item?.itemAttribute?.vegClassifier === "VEG";

  return veg ? (
    vegOption ? (
      <ItemCard item={item} />
    ) : null
  ) : nonVegOption ? (
    <ItemCard item={item} />
  ) : null;
});

export default ItemsCardContainer;

// {
//     "id": "107798523",
//     "name": "4 Crispy Veg + 2 Medium Fries",
//     "category": "Friends & Family Combo (Save upto 20%)",
//     "description": "4 Crispy Veg + 2 Medium Fries \nQty: 728 Gms| Kcal: 2101.2 | Carbs 1068.1 Gms| Sugar: 29.9 Gms| Fat: 89.2 Gms| Saturated fat: 32.7 Gms| Protein: 57.6 Gms| Sodium: 3427.2 Mg \nContains: Gluten, Soybean , Milk , Sesame seeds",
//     "imageId": "FOOD_CATALOG/IMAGES/CMS/2024/11/27/48de9167-c11d-4ded-b523-c2fd929f4f6f_60ed4d1a-fba4-41ed-a079-ba550c0c906f.jpg",
//     "inStock": 1,
//     "isVeg": 1,
//     "price": 40000,
//     "variants": {},
//     "variantsV2": {},
//     "itemAttribute": {
//         "vegClassifier": "VEG"
//     },
//     "defaultPrice": 40000,
//     "ribbon": {},
//     "type": "ITEM",
//     "itemBadge": {},
//     "badgesV2": {},
//     "ratings": {
//         "aggregatedRating": {
//             "rating": "4.1",
//             "ratingCount": "82 ratings",
//             "ratingCountV2": "82"
//         }
//     },
//     "itemPriceStrikeOff": true
// }
