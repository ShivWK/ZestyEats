import { useState, memo } from "react";
import ItemsSubHeading from "./ItemsSubHeading";
import ItemsCard from "./ItemsCard";

const ItemsMainHeading = memo(
  ({ heading, items = null, topBorder, borderBottom, categories = null }) => {
    const [isOpen, setIsOpen] = useState(true);
    const handleClick = () => {
      setIsOpen(!isOpen);
    };

    if (categories) {
      return (
        <div
          className="w-full"
          style={{
            borderTop: topBorder ? "16px solid #e5e7eb" : "none",
          }}
        >
          <div>
            <div className="flex justify-start items-center bg-white py-3 px-2">
              <h1 className="text-lg font-bold tracking-tight">{`${heading} (${categories.length})`}</h1>
            </div>
            <div
              className="overflow-hidden transition-all duration-300 linear"
              style={{
                display: isOpen ? "block" : "none",
                borderBottom: borderBottom ? "none" : "16px solid #e5e7eb",
              }}
            >
              {categories.map((category, index) => (
                <ItemsSubHeading
                  key={category?.categoryId}
                  title={category?.title}
                  itemCards={category?.itemCards}
                  borderBottom={index !== categories.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className="w-full cursor-pointer"
        style={{
          borderTop: topBorder ? "16px solid #e5e7eb" : "none",
        }}
      >
        <div>
          <div
            onClick={handleClick}
            className="flex justify-between items-center bg-white p-2 "
          >
            <h1 className="text-lg font-bold tracking-tight">{`${heading} (${items.length})`}</h1>
            <i
              className="ri-arrow-drop-down-line text-[#ff5200] text-4xl font-[200] inline-block"
              style={{
                transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            ></i>
          </div>
          <div
            className="overflow-hidden transition-all duration-300 linear p-0.5"
            style={{
              display: isOpen ? "block" : "none",
              borderBottom: borderBottom ? "none" : "16px solid #e5e7eb",
            }}
          >
            {items.map((item) => (
              <ItemsCard key={item?.card?.info?.id} item={item?.card?.info} />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default ItemsMainHeading;
