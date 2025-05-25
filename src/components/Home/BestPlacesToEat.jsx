import PlaceCards from "./PlaceCards";
import ShowMoreBtn from "./ShowMoreBtn";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBestPlacesToEat } from "../../features/home/homeSlice";

const BestPlacesToEat = memo(() => {
  const places = useSelector(selectBestPlacesToEat);
  const [shownPlaces, setShownPlaces] = useState([]);

  useEffect(() => {
    setShownPlaces(places.slice(0, 15));
  }, []);

  const handleShowMore = () => {
    setShownPlaces((prv) => {
     return [...prv, ...places.slice(15)];
    });
  };

  return (
    <>
      <h3 className="self-start">Best Places to Eat Across Cities</h3>
      <div className="flex flex-wrap justify-start gap-y-5 gap-x-8">
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

export default BestPlacesToEat;
