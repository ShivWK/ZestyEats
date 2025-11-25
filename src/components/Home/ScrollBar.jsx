// Done

import { useEffect, useState, useRef } from "react";

const Scrollbar = ({ scrolledPercentage, marginTop }) => {
  // console.log("ScrollBAr from Home rendered")
  const [adjustedScroll, setAdjustedScroll] = useState(0);
  const scrollContainerRef = useRef(null);
  const scrollBarRef = useRef(null);

  useEffect(() => {
    const adjustedScrollValue =
      scrolledPercentage <= 0
        ? 0
        : scrolledPercentage -
          (scrollBarRef.current.clientWidth /
            scrollContainerRef.current.clientWidth) *
            100;
    setAdjustedScroll(adjustedScrollValue);
  }, [scrolledPercentage]);

  return (
    <div
      className={`w-full flex justify-center`}
      style={{ marginTop: `${marginTop}px` }}
    >
      <div
        ref={scrollContainerRef}
        className="w-[70px] h-[3px] rounded-full bg-gray-200 relative"
      >
        <div
          ref={scrollBarRef}
          className="absolute w-1/6 rounded-full bg-primary h-full transition-all duration-300 ease-in-out"
          style={{ left: `${adjustedScroll}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Scrollbar;
