import { useState } from "react";

const ItemsSubHeading = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
     <div
      onClick={handleClick}
      className="w-full cursor-pointer"
    >
      <div
        className="flex justify-between items-center bg-white p-2"
        style={{
          borderBottom: isOpen ? "none" : "2px solid #e5e7eb",
          transition: "border-bottom 0.3s linear",
        }}
      >
        <h1 className="text-sm font-bold tracking-tight">{`${"Heading"} (${5})`}</h1>
        <i
          className="ri-arrow-drop-down-line text-[#ff5200] text-4xl font-[200] -ml-2.5 inline-block"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s linear",
          }}
        ></i>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 linear"
        style={{
          maxHeight: isOpen ? "1000px" : "0",
        }}
      >
        <p className="p-4 text-gray-700">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
          magni assumenda qui vel natus eos magnam laboriosam reiciendis a
          labore corrupti consequuntur rerum facere nam itaque omnis sint
          exercitationem, porro earum. Libero dolorem adipisci enim suscipit
          nulla nisi reprehenderit quam quas sit unde iusto magni, ut natus modi
          vel expedita.
        </p>
      </div>
    </div>
  );
};

export default ItemsSubHeading;
