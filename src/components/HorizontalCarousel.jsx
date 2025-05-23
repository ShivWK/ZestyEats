import Scrollbar from "./Home/ScroolBar";
import Button from "./Home/Button";
import { useState } from "react";

const HorizontalCarousel = ({
  heading,
  leftBtnRef,
  rightBtnRef,
  containerRef,
  showScrollBar = true,
  debounceLeft,
  debounceRight,
  Cards,
}) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

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

  return (
    <>
      <div className="flex justify-between flex-wrap items-center">
        <h2>
          {heading}
          {/* {user ? `${user}, what's on your mind?` : "What's on your mind?"} */}
        </h2>
        <div className="flex justify-between gap-1">
          <Button
            ref={leftBtnRef}
            clickHandler={debounceLeft}
            iconClass="left"
          />
          <Button
            ref={rightBtnRef}
            clickHandler={debounceRight}
            iconClass="right"
          />
        </div>
      </div>
      <div className="relative">
        <div
          onScroll={handleScroll}
          ref={containerRef}
          className="flex justify-between gap-4 overflow-x-auto hide-scrollbar"
        >
          {foodieThoughtsData.map((item) => (
            <Cards key={item.id} data={item} />
          ))}
        </div>
        {showScrollBar && (
          <Scrollbar scrolledPercentage={scrollPercentage} marginTop={10} />
        )}
      </div>
    </>
  );
};

export default HorizontalCarousel;
