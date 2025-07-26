import { memo, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectVegVariant,
  setRestaurantItems
} from "../../features/home/restaurantsSlice";
import ItemsCardContainer from "./ItemsCardContainer";

const ItemsSubHeading = memo(({ title, itemCards, borderBottom = true, restaurantData = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const initialRender = itemCards ? itemCards.length > 0 : false;
  const [shouldRender, setShouldRender] = useState(initialRender);
  const contentRef = useRef(null);
  const dispatch = useDispatch();

  const { vegOption, nonVegOption } = useSelector(selectVegVariant)

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const initialCount = itemCards ? itemCards.length : 0;
    setCount(initialCount);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const present = contentRef.current.children.length;
      setShouldRender(present > 0);
      setCount(contentRef.current.children.length);
    }
  }, [vegOption, nonVegOption]);

  return (
    <div
      className="w-full"
      style={{
        display: shouldRender ? "block" : "none",
      }}
    >
      <div
        onClick={handleClick}
        className={`flex justify-between items-center p-2 cursor-pointer ${isOpen ? "bg-[rgba(255,81,0,0.15)] dark:text-white" : "bg-white dark:bg-gray-800 dark:text-white"}`}
        style={{
          borderBottom: borderBottom
            ? isOpen
              ? "none"
              : "2px solid #e5e7eb"
            : "none",
          transition: "all 0.2s linear",
        }}
      >
        <h1 className="text-[16px] font-bold tracking-tight">{`${title} (${count})`}</h1>
        <i
          className="ri-arrow-drop-down-line text-[#ff5200] text-4xl font-[200] -ml-2.5 inline-block"
          style={{
            transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
            transition: "transform 0.2s linear",
          }}
        ></i>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 linear"
        style={{
          display: isOpen ? "block" : "none",
          borderBottom: "2px solid #e5e7eb",
        }}
      >
        {itemCards.map((item) => {
          // dispatch(setRestaurantItems(item?.card?.info));

          return <ItemsCardContainer
            key={item?.card?.info?.id}
            item={item?.card?.info}
            isParentOpen={isOpen}
            restaurantData={restaurantData}
          />
        })}
      </div>
    </div>
  );
});

export default ItemsSubHeading;
