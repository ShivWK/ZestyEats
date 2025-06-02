import { useState, memo, useRef, useEffect } from "react";
import ItemsSubHeading from "./ItemsSubHeading";
import ItemsCard from "./ItemsCard";
import { useSelector } from "react-redux";
import {
  selectVegOption,
  selectNonVegOption,
} from "../../features/home/restaurantsSlice";

const ItemsMainHeading = ({
  heading,
  items = null,
  topBorder,
  borderBottom,
  categories = null,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [count, setCount] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);
  const containerRef = useRef(null);

  let toDecreaseForNonVeg = 0;
  let toDecreaseForVeg = 0;


  const vegOption = useSelector(selectVegOption);
  const nonVegOption = useSelector(selectNonVegOption);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const initialCount = items
      ? items.length
      : categories
      ? categories.length
      : 0;
    setCount(initialCount);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setCount(containerRef.current.children.length);
      setShouldRender(containerRef.current.children.length > 0);
    }

    if (vegOption && !nonVegOption) {
      setCount(prev => prev - toDecreaseForNonVeg);
    } else if (nonVegOption && !vegOption) {
      setCount(prev => prev - toDecreaseForVeg);
    } 

  }, [vegOption, nonVegOption]);

  return (
    <div
      className="w-full"
      style={{
        borderTop: topBorder ? "16px solid #e5e7eb" : "none",
        borderBottom: borderBottom ? "none" : "16px solid #e5e7eb",
        display: shouldRender ? "block" : "none",
      }}
    >
      {categories ? (
        <>
          <div className="flex justify-start items-center bg-primary text-white py-3 px-2">
            <h1 className="text-lg font-bold tracking-tight">{`${heading} (${count})`}</h1>
          </div>
          <div
            ref={containerRef}
            className="overflow-hidden transition-all duration-300 ease-linear"
            style={{
              display: isOpen ? "block" : "none",
            }}
          >
            {categories.map((category, index) => {
                const countLength = category?.itemCards.length;
                let vegCount = 0;
                let nonVegCount = 0;

              category?.itemCards.forEach(element => {
                if (element?.card?.info?.itemAttribute?.vegClassifier === "VEG") {
                  vegCount++;
                } else if (element?.card?.info?.itemAttribute?.vegClassifier === "NONVEG") {
                  nonVegCount++;
                }
              });

              if (countLength === vegCount) {
                toDecreaseForVeg = toDecreaseForVeg + 1;
              } else if (countLength === nonVegCount) {
                toDecreaseForNonVeg = toDecreaseForNonVeg + 1;
              }

              return <ItemsSubHeading
                key={category?.categoryId}
                title={category?.title}
                itemCards={category?.itemCards}
                borderBottom={index !== categories.length - 1}
              />;
            })}
          </div>
        </>
      ) : (
        <div>
          <div
            onClick={handleClick}
            className="flex justify-between items-center bg-primary p-2 text-white cursor-pointer"
          >
            <h1 className="text-lg font-bold tracking-tight">{`${heading} (${count})`}</h1>
            <i
              className="ri-arrow-drop-down-line text-4xl font-[200] inline-block"
              style={{
                transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease-in-out",
              }}
            ></i>
          </div>
          <div
            ref={containerRef}
            className="overflow-hidden transition-all duration-300 linear p-0.5"
            style={{
              display: isOpen ? "block" : "none",
            }}
          >
            {items.map((item) => (
              <ItemsCard key={item?.card?.info?.id} item={item?.card?.info} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsMainHeading;
