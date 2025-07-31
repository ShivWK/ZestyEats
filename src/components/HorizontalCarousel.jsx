import Scrollbar from "./Home/ScroolBar";
import Button from "./Home/Button";
import { useState, useEffect, useRef, memo } from "react";
import createDebounce from "../utils/debounceCreater";

const HorizontalCarousel = memo(({
  heading = null,
  margin_bottom = 0,
  scrollMargin = 0,
  showScrollBar = true,
  dataToMap,
  Card,
  autoScrollWidth = 300,
  restaurantData = null
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

  const debouncedHandleRightClick = useRef(createDebounce(handleRightClick, 100));
  const debouncedHandleLeftClick = useRef(createDebounce(handleLeftClick, 100));
  const [hideScrollBar, setHideScrollBar] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (dataToMap.length) {
      setTimeout(() => {
        handleScroll();
      }, 0);
    }

    const scrollInterval = setInterval(() => {
      if (!clicked.current) {
        if (container.scrollWidth > container.clientWidth) {
          container.scrollBy({
            left: autoScrollWidth * direction.current,
            behavior: "smooth",
          })
        }

        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          direction.current = -1;
        }

        if (container.scrollLeft <= 0) {
          direction.current = 1;
        }
      }

      if (container.scrollLeft + container.clientWidth < container.scrollWidth) {
        rightBtnRef.current.disabled = false;
      }

      if (container.scrollLeft > 0) {
        leftBtnRef.current.disabled = false;
      }
    }, 2000)

    container.scrollTo({
      left: 0,
      behavior: "smooth",
    });

    return () => clearInterval(scrollInterval);
  }, [dataToMap])

  function handleScroll() {
    const container = containerRef.current;
    if (!container) return;

    const clientWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const viewed = clientWidth + scrollLeft;

    if (viewed >= scrollWidth) {
      rightBtnRef.current.disabled = true;
    }

    if (!(scrollLeft > 0)) {
      leftBtnRef.current.disabled = true;
    }

    if (scrollLeft == 0 && clientWidth === scrollWidth) {
      rightBtnRef.current.hidden = true;
      leftBtnRef.current.hidden = true;
      setHideScrollBar(true)
    }

    const scrolledPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollPercentage(scrolledPercentage);
  }

  function handleRightClick() {
    clicked.current = true;

    const container = containerRef.current;
    if (!container) return; // important because there can be a case when carousel container not loaded and user clicks the button then we will get error.

    container.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  }

  function handleLeftClick(e) {
    rightBtnRef.current.disabled = false;
    clicked.current = true;

    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="flex justify-between flex-wrap items-center" style={{ marginBottom: margin_bottom }}>
        {heading && (
          <h2 className="dark:text-white">
            {heading}
          </h2>
        )}
        <div className={`hidden md:flex justify-between gap-1 ${!heading && "ml-auto"}`}>
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
          onScroll={handleScroll}
          ref={containerRef}
          className="flex justify-start gap-3 md:gap-7 overflow-y-visible overflow-x-auto hide-scrollbar py-2"
          onTouchEnd={() => clicked.current = true}
        >
          {dataToMap.map((item, index) => (
            <Card key={item?.id + index} data={item} restaurantData={restaurantData} />
          ))}
        </div>
        {(showScrollBar && !hideScrollBar) && (
          <Scrollbar scrolledPercentage={scrollPercentage} marginTop={scrollMargin} />
        )}
      </div>
    </>
  );
});

export default HorizontalCarousel;
