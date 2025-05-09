import { useEffect, useRef, useState } from "react";
import Cards from "./Cards";
import Button from "../Button";
import { useSelector } from "react-redux";
import { selectFoodieThoughtsData } from "../../../features/home/homeSlice";
import ScrollBar from "../ScroolBar";

const FoodieThoughts = ({ isLoading }) => {
  const foodieThoughtsData = useSelector(selectFoodieThoughtsData);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const containerRef = useRef();
  const rightBtnRef = useRef();
  const leftBtnRef = useRef();
  const [user, setUser] = useState("Shivendra");

  // Store the debounced function in a ref so that:
  // 1. It is created only once on initial render.
  // 2. It preserves the internal timer between re-renders.
  // This avoids creating a new debounced function on every input change,
  // which would break debounce behavior by resetting the timer each time.
  // Use function declaration for debounceCreate, and passed functions to avoid hoisting issues.
  // and to ensure it is defined before being used in the useRef hook

  const debouncedHandleRightClick = useRef(createDebounce(handleRightClick, 100));
  const debouncedHandleLeftClick = useRef(createDebounce(handleLeftClick, 100));

  useEffect(() => {
    if (foodieThoughtsData.length) {
      setTimeout(() => {
        handleScroll();
      }, 0);
    }

    const container = containerRef.current;
    container.scrollTo({
      left: 0,
      behavior: "smooth"
    })
  }, [foodieThoughtsData]);

  function handleScroll() {
    const container = containerRef.current;
    if (!container) return; // If ref is not attaiched then control will return

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
    if (!container) return; // important because there can be a case when carousel container not loaded and user clicks the button then we will get error.

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
    foodieThoughtsData &&
    <>
      <div className="flex justify-between flex-wrap items-center">
        <h3>{user ? `${user}, what's on your mind?` : "What's on your mind?"}</h3>
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
      <div className="relative">
        <div
          onScroll={handleScroll}
          ref={containerRef}
          className="flex justify-between overflow-x-auto hide-scrollbar"
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : foodieThoughtsData.length ? (
            foodieThoughtsData.map((item) => (
              <Cards key={item.id} data={item} />
            ))
          ) : (
            <p>No data found</p>
          )}
        </div>
        <ScrollBar
          scrolledPercentage={scrollPercentage}
          marginTop={10}
        />
      </div>
    </>
  );
};

export default FoodieThoughts;
