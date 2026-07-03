import Scrollbar from './Home/ScrollBar';
import Button from './Home/Button';
import { useState, useEffect, useRef, memo } from 'react';
import createDebounce from '../utils/debounceCreator';

const HorizontalCarousel = memo(
  ({
    heading = null,
    margin_bottom = 0,
    scrollMargin = 0,
    showScrollBar = true,
    dataToMap,
    Card,
    autoScrollWidth = 300,
    restaurantData = null,
  }) => {
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const clicked = useRef(false);
    const direction = useRef(1);
    const rightBtnRef = useRef(null);
    const leftBtnRef = useRef(null);
    const containerRef = useRef(null);

    // Store the debounced function in a ref so that:
    // 1. It is created only once on initial render.
    // 2. It preserves the internal timer between re-renders.
    // This avoids creating a new debounced function on every input change,
    // which would break debounce behavior by resetting the timer each time.
    // Use function declaration for debounceCreate, and passed functions to avoid hoisting issues.
    // and to ensure it is defined before being used in the useRef hook

    const debouncedHandleRightClick = useRef(
      createDebounce(handleRightClick, 100),
    );
    const debouncedHandleLeftClick = useRef(
      createDebounce(handleLeftClick, 100),
    );
    const [hideScrollBar, setHideScrollBar] = useState(false);

    useEffect(() => {
      const container = containerRef.current;

      const scrollInterval = setInterval(() => {
        if (!clicked.current) {
          if (container.scrollWidth > container.clientWidth) {
            container.scrollBy({
              left: autoScrollWidth * direction.current,
              behavior: 'smooth',
            });
          }

          if (
            container.scrollLeft + container.clientWidth >=
            container.scrollWidth
          ) {
            direction.current = -1;
          }

          if (container.scrollLeft <= 0) {
            direction.current = 1;
          }
        }

        if (
          container.scrollLeft + container.clientWidth <
          container.scrollWidth
        ) {
          rightBtnRef.current.disabled = false;
        }

        if (container.scrollLeft > 0) {
          leftBtnRef.current.disabled = false;
        }
      }, 2000);

      container.scrollTo({
        left: 0,
        behavior: 'smooth',
      });

      return () => clearInterval(scrollInterval);
    }, [dataToMap, autoScrollWidth]);

    const calPercentage = (sl,sw,cw) => {
      const totalViewed = ((sl + cw) / sw) * 100;
      return totalViewed;
    };

    useEffect(() => {
      if (!containerRef.current) return;
      const ele = containerRef.current;

      const scrollHandler = () => {
        const {
          scrollWidth: scrollW,
          scrollLeft: scrollL,
          clientWidth: clientW,
        } = ele;
        if (clientW >= scrollW) setHideScrollBar(true);
        setScrollPercentage(calPercentage(scrollL, scrollW, clientW));
      };

      scrollHandler();

      ele.addEventListener('scroll', scrollHandler);
      ele.addEventListener('resize', scrollHandler);

      return () => {
        ele.removeEventListener('scroll', scrollHandler);
        ele.removeEventListener('resize', scrollHandler);
      };
    }, []);

    function handleRightClick() {
      clicked.current = true;

      const container = containerRef.current;
      if (!container) return; // important because there can be a case when carousel container not loaded and user clicks the button then we will get error.

      container.scrollBy({
        left: 600,
        behavior: 'smooth',
      });
    }

    function handleLeftClick() {
      rightBtnRef.current.disabled = false;
      clicked.current = true;

      const container = containerRef.current;
      if (!container) return;

      container.scrollBy({
        left: -600,
        behavior: 'smooth',
      });
    }

    return (
      <>
        <div
          className="flex flex-wrap items-center justify-between"
          style={{ marginBottom: margin_bottom }}
        >
          {heading && <h2 className="dark:text-white">{heading}</h2>}
          <div
            className={`hidden justify-between gap-1 md:flex ${!heading && 'ml-auto'}`}
          >
            <Button
              ref={leftBtnRef}
              clickHandler={debouncedHandleLeftClick.current}
              iconClass="left"
            />
            <Button
              ref={rightBtnRef}
              clickHandler={debouncedHandleRightClick.current}
              iconClass="right"
            />
          </div>
        </div>
        <div className="relative">
          <div
            ref={containerRef}
            className="hide-scrollbar flex justify-start gap-3 overflow-x-auto overflow-y-visible py-2 md:gap-7"
            onTouchMove={() => (clicked.current = true)}
          >
            {dataToMap.map((item, index) => (
              <Card
                key={item?.id + index}
                data={item}
                restaurantData={restaurantData}
              />
            ))}
          </div>
          {showScrollBar && !hideScrollBar && (
            <Scrollbar
              scrolledPercentage={scrollPercentage}
              marginTop={scrollMargin}
            />
          )}
        </div>
      </>
    );
  },
);

export default HorizontalCarousel;
