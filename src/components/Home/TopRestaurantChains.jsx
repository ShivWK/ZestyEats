import { selectTopRestaurantsData } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Cards from "./Cards";
import Button from "./Button";
import Scrollbar from "./ScroolBar";
import { selectTopRestaurantsTitle } from "../../features/home/homeSlice";

const TopRestaurantChains = ({ isLoading }) => {
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const containerRef = useRef();
  const rightBtnRef = useRef();
  const leftBtnRef = useRef();
  const title = useSelector(selectTopRestaurantsTitle);

  useEffect(() => {
    if (topRestaurantsChainsData.length) {
      setTimeout(() => {
        handleScroll();
      }, 0);
    }

    const container = containerRef.current;
    container.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  }, [topRestaurantsChainsData]);

  useEffect(() => {}, [topRestaurantsChainsData]);

  // Store the debounced function in a ref so that:
  // 1. It is created only once on initial render.
  // 2. It preserves the internal timer between re-renders.
  // This avoids creating a new debounced function on every input change,
  // which would break debounce behavior by resetting the timer each time.
  // Use function declaration for debounceCreate, and passed functions to avoid hoisting issues.
  // and to ensure it is defined before being used in the useRef hook

  const debouncedHandleRightClick = useRef(
    createDebounce(handleRightClick, 100)
  );
  const debouncedHandleLeftClick = useRef(createDebounce(handleLeftClick, 100));

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

    const scrolledPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollPercentage(scrolledPercentage);
  }

  function handleRightClick(e) {
    leftBtnRef.current.disabled = false;

    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  }

  function handleLeftClick(e) {
    rightBtnRef.current.disabled = false;

    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  }

  function createDebounce(toCall, delay) {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(toCall, delay);
    };
  }

  return (
    <>
      <div className="flex justify-between flex-wrap items-center">
        <h2>{title}</h2>
        <div className="flex justify-between gap-1">
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
      <div className="relative mt-2">
        <div
          onScroll={handleScroll}
          ref={containerRef}
          className="flex mt-0 gap-6 overflow-x-auto hide-scrollbar "
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : topRestaurantsChainsData.length ? (
            topRestaurantsChainsData.map((item) => (
              <Cards key={item.info.id} data={item.info} />
            ))
          ) : (
            <p>No data found</p>
          )}
        </div>
        <Scrollbar scrolledPercentage={scrollPercentage} marginTop={10} />
      </div>
    </>
  );
};

export default TopRestaurantChains;
