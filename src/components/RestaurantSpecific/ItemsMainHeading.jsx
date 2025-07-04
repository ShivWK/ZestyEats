import { useState, memo, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemsSubHeading from "./ItemsSubHeading";
import {
  setMenuItems,
  selectVegVariant,
  setRestaurantItems
} from "../../features/home/restaurantsSlice";
import ItemsCardContainer from "./ItemsCardContainer";

const ItemsMainHeading = ({
  heading,
  items = null,
  topBorder,
  borderBottom,
  categories = null,
  restaurantData = null
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [count, setCount] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  let toDecreaseForNonVeg = 0;
  let toDecreaseForVeg = 0;
  let itemsVegCount = 0;
  let itemsNonVegCount = 0;

  const { vegOption, nonVegOption } = useSelector(selectVegVariant);

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

    let nonVeg = false;
    let veg = false;

    if (categories) {
      if (toDecreaseForNonVeg === initialCount) nonVeg = true;
      if (toDecreaseForVeg === initialCount) veg = true;
    }

    if (items) {
      if (itemsNonVegCount === initialCount) nonVeg = true;
      if (itemsVegCount === initialCount) veg = true
    }

    dispatch(setMenuItems({ title: heading, veg, nonVeg }));
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setCount(containerRef.current.children.length);
    }

    if (vegOption && !nonVegOption) {
      setCount((prev) => prev - toDecreaseForNonVeg);
    } else if (nonVegOption && !vegOption) {
      setCount((prev) => prev - toDecreaseForVeg);
    }
  }, [vegOption, nonVegOption]);

  useEffect(() => {
    if (count === 0) {
      setShouldRender(false);
    } else {
      setShouldRender(true);
    }
  }, [count]);

  const path = heading.replace(/\s/g, "-");

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
          <div
            id={path}
            className="flex justify-start items-center bg-primary text-white py-3 px-2 scroll-mt-28"
          >
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

              category?.itemCards.forEach((element) => {
                if (
                  element?.card?.info?.itemAttribute?.vegClassifier === "VEG"
                ) {
                  vegCount++;
                } else if (
                  element?.card?.info?.itemAttribute?.vegClassifier === "NONVEG"
                ) {
                  nonVegCount++;
                }
              });

              if (countLength === vegCount) {
                toDecreaseForVeg += 1;
              } else if (countLength === nonVegCount) {
                toDecreaseForNonVeg += 1;
              }

              return (
                <ItemsSubHeading
                  key={category?.categoryId}
                  title={category?.title}
                  itemCards={category?.itemCards}
                  borderBottom={index !== categories.length - 1}
                  restaurantData={restaurantData}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div>
          <div
            id={path}
            onClick={handleClick}
            className="flex justify-between items-center bg-primary p-2 text-white cursor-pointer scroll-mt-28"
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
            {items.map((item) => {
              const itemData = item?.card?.info;
              // dispatch(setRestaurantItems(itemData));

              if (itemData?.itemAttribute?.vegClassifier === "VEG") itemsVegCount++;
              if (itemData?.itemAttribute?.vegClassifier === "NONVEG") itemsNonVegCount++;
              
              return <ItemsCardContainer
                key={itemData?.id}
                item={itemData}
                isParentOpen={isOpen}
                restaurantData={restaurantData}
              />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsMainHeading;
