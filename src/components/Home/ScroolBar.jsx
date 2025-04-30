import { useEffect, useState, useRef } from "react";

const Scrollbar = ({
  scrolledPercentage,
  marginTop,
}) => {
  const [adjudtedScroll, setAdjudtedScroll] = useState(0);
  const scrollContainerRef = useRef(null);
  const scrrollBarRef = useRef(null);

  useEffect(() => {
    // Problem goes in left too much, right is fine

    const adjudtedScrollValue =
      scrolledPercentage <= 0
        ? 0
        : scrolledPercentage -
          (scrrollBarRef.current.clientWidth /
            scrollContainerRef.current.clientWidth) *
            100;
    setAdjudtedScroll(adjudtedScrollValue);
  }, [scrolledPercentage]);

  return (
    <div
      className="w-full flex justify-center"
      style={{ marginTop: `${marginTop}px` }}
    >
      <div
        ref={scrollContainerRef}
        className="w-[70px] h-1 rounded-full bg-gray-200 relative"
      >
        <div
          ref={scrrollBarRef}
          className="absolute w-1/6 rounded-full bg-primary h-full transition-all duration-300 ease-in-out"
          style={{ left: `${adjudtedScroll}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Scrollbar;
