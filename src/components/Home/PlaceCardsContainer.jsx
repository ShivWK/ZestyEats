import PlaceCards from "./PlaceCards";
import ShowMoreBtn from "./ShowMoreBtn";
import { memo, useCallback, useEffect, useState } from "react";

const PlaceCardsContainer = memo(({ data, heading = null, clickHandler , path}) => {
  const [shownPlaces, setShownPlaces] = useState([]);

  useEffect(() => {
    setShownPlaces(data.slice(0, 11));
  }, []);

  const handleShowMore = useCallback(() => {
    setShownPlaces((prv) => {
     return [...prv, ...data.slice(11)];
    });
  }, [data, setShownPlaces]);

  const title = heading || "Best Cuisines Near Me"

  return (
    <>
      <h3 className="self-start">{title}</h3>
      <div className="flex flex-wrap justify-start gap-y-5 md:gap-x-8 gap-x-2.5">
        {shownPlaces.map((item) => (
          <PlaceCards key={item.link+Math.random()} data={item} clickHandler={clickHandler} path={path}/>
        ))}
        {shownPlaces.length !== data.length && (
          <ShowMoreBtn handleClick={handleShowMore} />
        )}
      </div>
    </>
  );
});

export default PlaceCardsContainer;
