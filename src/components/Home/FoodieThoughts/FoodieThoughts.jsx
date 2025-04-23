import { useGetfoodieThoughtsQuery } from "../../../features/home/homeApiSlice";
import { useEffect, useRef, useState } from "react";
import Cards from "./Cards";

export default function FoodieThoughts() {
  const { data = [], isLoading } = useGetfoodieThoughtsQuery();
  const containerRef = useRef();
  const rightBtnRef = useRef();
  const leftBtnRef = useRef();
  const [user, setUser] = useState("Shivendra");

  useEffect(() => {
    if (data.length) {
      setTimeout(()=> {
        handleScroll();
      }, 0)
    }
  }, [data])

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
  }

  function handleRightClick(e) {
    console.log("clicked Right");
    leftBtnRef.current.disabled = false;

    const container = containerRef.current;
    if (!container) return; // important because there can be case when carousel container not loaded and user clicks the button then we will get error.

    container.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  }

  function handleLeftClick(e) {
    console.log("clicked Left");
    rightBtnRef.current.disabled = false;

    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  }

  return (
    <>
      <div className="flex justify-between flex-wrap items-center">
        <h3 className="text-[21px] font-bold">{`${user}, what's on your mind?`}</h3>
        <div className="flex justify-between gap-1">
          <button
            ref={leftBtnRef}
            onClick={handleLeftClick}
            className="group disabled:cursor-not-allowed cursor-pointer"
          >
            <i className="ri-arrow-left-circle-fill text-[40px] text-[#ff5200] group-disabled:text-gray-400"></i>
          </button>
          <button
            ref={rightBtnRef}
            onClick={handleRightClick}
            className="group disabled:cursor-not-allowed cursor-pointer"
          >
            <i className="ri-arrow-right-circle-fill text-[40px] text-[#ff5200] group-disabled: group-disabled:text-gray-400"></i>
          </button>
        </div>
      </div>
      <div className="relative">
        <div
          onScroll={handleScroll}
          ref={containerRef}
          className="flex gap-2 overflow-x-auto "
        >
          {isLoading ? (
            <h2>Loading</h2>
          ) : data.length ? (
            data.map((item) => <Cards key={item.id} data={item} />)
          ) : (
            <h2>No data found</h2>
          )}
        </div>
      </div>
    </>
  );
}
