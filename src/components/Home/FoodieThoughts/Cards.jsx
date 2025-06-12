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
  const path = `specificFood/${category}?lat=${lat}&lng=${lng}&collection_id=${collection_id}&tags=${tags}`;

  const handleClick = () => {
    dispatch(setCurrentFoodCategory(category));
  };

  return (
    <NavLink to={path} onClick={handleClick} className="shrink-0 w-36">
      <img
        className="w-full h-44 rounded object-cover"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/${data?.imageId}`}
        alt={data?.accessibility?.altText}
      />
    </NavLink>
  );
});

export default Cards;

// {
//     "id": "750591",
//     "imageId": "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png",
//     "action": {
//         "link": "https://www.swiggy.com/collections/83639?collection_id=83639&search_context=biryani&tags=layout_CCS_Biryani&type=rcv2",
//         "text": "Biryani",
//         "type": "WEBLINK"
//     },
//     "entityType": "BANNER",
//     "accessibility": {
//         "altText": "restaurants curated for biryani",
//         "altTextCta": "open"
//     },
//     "entityId": "swiggy://collectionV2?collection_id=83639&tags=layout_CCS_Biryani&search_context=biryani",
//     "frequencyCapping": {},
//     "externalMarketing": {}
//}
