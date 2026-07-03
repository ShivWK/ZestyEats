// Done

import PlaceCards from './PlaceCards';
import ShowMoreBtn from './ShowMoreBtn';
import { useRef } from 'react';
import { useCallback, useEffect, useState } from 'react';

const PlaceCardsContainer = ({
  data,
  heading = null,
  clickHandler,
  path,
  showHeading = true,
  targetedCity,
}) => {
  // console.log("PlaceCardsContainer rendered")
  const [shownCards, setShownCards] = useState([]);
  const [lastEnd, setLastEnd] = useState(12);
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
      setLastEnd((prev) => prev + 12);

      if (newShowCards.length === data?.length) setHideShowMoreBtn(true);
      return newShowCards;
    });
  }, [data, lastEnd]);

  const title = heading || 'Best Cuisines Near Me';

  return (
    <>
      {showHeading && <h3 className="self-start dark:text-white">{title}</h3>}
      <div
        id="dd"
        ref={containerRef}
        className="flex w-full flex-wrap justify-start gap-x-2.5 gap-y-5 max-md:pl-1 md:gap-x-8"
      >
        {shownCards.map((item) => (
          <PlaceCards
            key={item.link + Math.random()}
            data={item}
            clickHandler={clickHandler}
            path={path}
            targetedCity={targetedCity}
          />
        ))}
      </div>
      {shownCards.length !== data.length && !hideShowMoreBtn && (
        <ShowMoreBtn handleClick={handleShowMore} />
      )}
    </>
  );
};

export default PlaceCardsContainer;
