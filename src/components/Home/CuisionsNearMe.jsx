import PlaceCards from "./PlaceCards";
import ShowMoreBtn from "./ShowMoreBtn";
import { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBestCuisionsNearMe } from "../../features/home/homeSlice";

const CuisionsNearMe = memo(() => {
  const places = useSelector(selectBestCuisionsNearMe);
  const [shownPlaces, setShownPlaces] = useState([]);

  useEffect(() => {
    setShownPlaces(places.slice(0, 15));
  }, []);

  const handleShowMore = useCallback(() => {
    setShownPlaces((prv) => {
     return [...prv, ...places.slice(15)];
    });
  }, [places, setShownPlaces]);

  return (
    <>
      <h3 className="self-start">Best Cuisines Near Me</h3>
      <div className="flex flex-wrap justify-start gap-y-5 md:gap-x-8 gap-x-3">
        {shownPlaces.map((item) => (
          <PlaceCards key={item.link} data={item} />
        ))}
        {shownPlaces.length !== places.length && (
          <ShowMoreBtn handleClick={handleShowMore} />
        )}
      </div>
    </>
  );
});

export default CuisionsNearMe;
