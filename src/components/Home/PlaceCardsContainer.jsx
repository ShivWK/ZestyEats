import PlaceCards from "./PlaceCards";
import ShowMoreBtn from "./ShowMoreBtn";
import { memo, useCallback, useEffect, useState } from "react";

const PlaceCardsContainer = memo(({ data, heading = null, clickHandler, path, showHeading = true }) => {
  const [shownCards, setShownCards] = useState([]);
  const [lastEnd, setLastEnd] = useState(12)

  useEffect(() => {
    setShownCards(data.slice(0, 12));
  }, []);

  const handleShowMore = useCallback(() => {
    setShownCards((prv) => {
      const newShowCards = [...prv, ...data.slice(lastEnd, lastEnd + 12)];
      setLastEnd(prev => prev + 12);
      return newShowCards
    });
  }, [data, setShownCards]);

  const title = heading || "Best Cuisines Near Me"

  return (
    <>
      {showHeading && <h3 className="self-start">{title}</h3>}
      <div className="flex flex-wrap justify-start gap-y-5 md:gap-x-8 gap-x-2.5">
        {shownCards.map((item) => (
          <PlaceCards key={item.link + Math.random()} data={item} clickHandler={clickHandler} path={path} />
        ))}

      </div>
      {shownCards.length !== data.length && (
        <ShowMoreBtn handleClick={handleShowMore} />
      )}
    </>
  );
});

export default PlaceCardsContainer;
