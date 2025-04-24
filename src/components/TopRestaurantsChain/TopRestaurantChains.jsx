import { selectTopRestaurantsData } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Cards from './Cards'
import Button from "../Home/Button";

const TopRestaurantChains = ({ isLoading }) => {
  const topRestaurantsChainsData = useSelector(selectTopRestaurantsData);
  const containerRef = useRef();
  const rightBtnRef = useRef();
  const leftBtnRef = useRef();
  const [location, setLocation] = useState("Your Location");

  console.log(topRestaurantsChainsData)

  useEffect(() => {
    if (topRestaurantsChainsData.length) {
      setTimeout(() => {
        handleScroll();
      }, 0);
    }
  }, [topRestaurantsChainsData]);

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

  return <>
        <div className="flex justify-between flex-wrap items-center">
          <h3>{`Top restaurant chains in ${location}`}</h3>
          <div className="flex justify-between gap-1">
            <Button ref={leftBtnRef} clickHandler={handleLeftClick} iconClass="left"/>
            <Button ref={rightBtnRef} clickHandler={handleRightClick} iconClass="right"/>
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
            ) : topRestaurantsChainsData.length ? (
              topRestaurantsChainsData.map((item) => <Cards key={item.info.id} data={item.info} />)
            ) : (
              <h2>No data found</h2>
            )}
          </div>
        </div>
      </>;
}

export default TopRestaurantChains