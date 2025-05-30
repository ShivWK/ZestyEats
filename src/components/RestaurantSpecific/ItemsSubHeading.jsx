import { memo, useState, useEffect, useRef } from "react";
import ItemsCard from "./ItemsCard";

const ItemsSubHeading = memo(({ title, itemCards, borderBottom = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div onClick={handleClick} className="w-full cursor-pointer">
      <div
        className="flex justify-between items-center bg-white p-2"
        style={{
          borderBottom: borderBottom
            ? isOpen
              ? "none"
              : "2px solid #e5e7eb"
            : "none",
          backgroundColor: isOpen ? "rgba(255,81,0,0.15" : "#ffffff",
          transition: "border-bottom 0.3s linear",
        }}
      >
        <h1 className="text-[16px] font-bold tracking-tight">{`${title} (${itemCards.length})`}</h1>
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
          // maxHeight: height
            display: isOpen ? "block" : "none",
            borderBottom: "2px solid #e5e7eb",
        }}
      >
        {itemCards.map((item) => (
          <ItemsCard key={item?.card?.info?.id} item={item?.card?.info} />
        ))}
      </div>
    </div>
  );
});

export default ItemsSubHeading;
