// Done

import { useEffect, useState, useRef } from 'react';

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
      className={`flex w-full justify-center`}
      style={{ marginTop: `${marginTop}px` }}
    >
      <div
        ref={scrollContainerRef}
        className="relative h-[3px] w-[70px] rounded-full bg-gray-200"
      >
        <div
          ref={scrollBarRef}
          className="bg-primary absolute h-full w-1/6 rounded-full transition-all duration-300 ease-in-out"
          style={{ left: `${adjustedScroll}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Scrollbar;
