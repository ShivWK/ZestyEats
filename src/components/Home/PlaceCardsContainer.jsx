// Done

import PlaceCards from "./PlaceCards";
import ShowMoreBtn from "./ShowMoreBtn";
import { useRef } from "react";
import { useCallback, useEffect, useState } from "react";

const PlaceCardsContainer = ({ data, heading = null, clickHandler, path, showHeading = true, targetedCity }) => {
  const [shownCards, setShownCards] = useState([]);
  const [lastEnd, setLastEnd] = useState(12)
  const [hideShowMoreBtn, setHideShowMoreBtn] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setShownCards(data.slice(0, 12));
    setLastEnd(12);
    setHideShowMoreBtn(false);
  }, [data]);

  const handleShowMore = useCallback(() => {
    setShownCards((prv) => {
      const newShowCards = [...prv, ...data.slice(lastEnd, lastEnd + 12)];
      setLastEnd(prev => prev + 12);

      if(newShowCards.length === data?.length) setHideShowMoreBtn(true);
      return newShowCards
    });

  }, [data, lastEnd]);

  const title = heading || "Best Cuisines Near Me"

  return (
    <>
      {showHeading && <h3 className="self-start dark:text-white">{title}</h3>}
      <div id="dd" ref={containerRef} className="flex max-md:pl-1 flex-wrap w-full justify-start gap-y-5 md:gap-x-8 gap-x-2.5">
        {shownCards.map((item) => (
          <PlaceCards key={item.link + Math.random()} data={item} clickHandler={clickHandler} path={path} targetedCity={targetedCity} />
        ))}

      </div>
      {shownCards.length !== data.length && (
        !hideShowMoreBtn && <ShowMoreBtn handleClick={handleShowMore} />
      )}
    </>
  );
};

export default PlaceCardsContainer;
