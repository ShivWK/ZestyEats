// Done

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { selectLatAndLng } from '../../../features/home/homeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentFoodCategory } from '../../../features/header/headerSlice';
import {
  selectCityLatAndLng,
  selectLocalityLatAndLng,
} from '../../../features/cityHome/cityHomeSlice';

const Card = ({ data }) => {
  // console.log("FoodieThoughts Card rendered")
  const [isError, setIsError] = useState(false);
  const pathname = useLocation().pathname;
  let latLngSelector = selectLatAndLng;

  if (pathname.includes('cityPage')) {
    latLngSelector = selectCityLatAndLng;
  } else if (pathname.includes('cityLocality')) {
    latLngSelector = selectLocalityLatAndLng;
  }

  const { lat, lng } = useSelector(latLngSelector);
  const dispatch = useDispatch();
  const category = data?.action?.text;
  const link = data?.action?.link;
  const urlObj = new URL(link).searchParams;
  const collection_id = +urlObj.get('collection_id');
  const tags = urlObj.get('tags');
  const path = `/specificFood/${category}?lat=${lat}&lng=${lng}&collection_id=${collection_id}&tags=${tags}`;

  const handleClick = () => {
    dispatch(setCurrentFoodCategory(category));
  };

  return (
    <Link
      to={path}
      onClick={handleClick}
      className="bg-gray w-28 shrink-0 lg:w-36"
    >
      <img
        className="my-3 h-[9rem] w-full rounded object-cover lg:my-2 lg:h-44 dark:shadow-[0_0_5px_2px_rgba(156,145,145,0.8)]"
        src={
          isError
            ? '/images/fallback.png'
            : `https://media-assets.swiggy.com/swiggy/image/upload/${data?.imageId}`
        }
        alt={data?.accessibility?.altText}
        onError={() => setIsError(true)}
      />
    </Link>
  );
};

export default Card;
