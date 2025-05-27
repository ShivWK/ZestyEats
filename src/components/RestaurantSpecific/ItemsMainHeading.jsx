import { useState } from "react";

const ItemsMainHeading = ({ heading, items, topBorder }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full cursor-pointer"
      style={{
        borderTop: topBorder ? "16px solid #e5e7eb" : "none",
      }}
    >
      <div>
        <div className="flex justify-between items-center bg-white p-2 ">
          <h1 className="text-lg font-bold tracking-tight">{`${heading} (${items.length})`}</h1>
          <i
            className="ri-arrow-drop-down-line text-[#ff5200] text-4xl font-[200] -ml-2.5 inline-block"
            style={{
              transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease-in-out",
            }}
          ></i>
        </div>
        <div
          className="border-b-gray-200 border-b-[16px] overflow-hidden transition-all duration-300 linear"
          style={{
            maxHeight: isOpen ? "1000px" : "0",
          }}
        >
          <p className="p-4 text-gray-700">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
            magni assumenda qui vel natus eos magnam laboriosam reiciendis a
            labore corrupti consequuntur rerum facere nam itaque omnis sint
            exercitationem, porro earum. Libero dolorem adipisci enim suscipit
            nulla nisi reprehenderit quam quas sit unde iusto magni, ut natus
            modi vel expedita.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemsMainHeading;
