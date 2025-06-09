const LeftMenu = ({ data, width, clickHandler, currentIndex }) => {
  return (
    <aside
      className=" bg-gray-200 py-6 pl-6"
      style={{
        flexBasis: width,
      }}
    >
      {data.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => clickHandler(index)}
            className="group flex items-center justify-center py-6 cursor-pointer"
            style={{
              backgroundColor: currentIndex === index ? "white" : "transparent",
              color: currentIndex === index ? "black" : "#4a5565",
            }}
          >
            <p className="font-bold group-hover:text-black select-none">
              {item}
            </p>
          </div>
        );
      })}
    </aside>
  );
};

export default LeftMenu;
