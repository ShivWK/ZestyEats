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
  const scrollContainerRef = useRef();
  const scrrollBarRef = useRef();
  const [user, setUser] = useState("Shivendra");

  useEffect(() => {
    if (foodieThoughtsData.length) {
      setTimeout(() => {
        handleScroll();
      }, 0);
    }
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
    <>
      <div className="flex justify-between flex-wrap items-center">
        <h3>{`${user}, what's on your mind?`}</h3>
        <div className="flex justify-between gap-1">
          <Button
            ref={leftBtnRef}
            clickHandler={createDebounce(handleLeftClick, 200)}
            iconClass="left"
          />
          <Button
            ref={rightBtnRef}
            clickHandler={createDebounce(handleRightClick, 200)}
            iconClass="right"
          />
        </div>
      </div>
      <div className="relative">
        <div
          onScroll={handleScroll}
          ref={containerRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar"
        >
          {isLoading ? (
            <h2>Loading...</h2>
          ) : foodieThoughtsData.length ? (
            foodieThoughtsData.map((item) => (
              <Cards key={item.id} data={item} />
            ))
          ) : (
            <h2>No data found</h2>
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
