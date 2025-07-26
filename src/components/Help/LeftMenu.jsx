const LeftMenu = ({ data, width, clickHandler, currentIndex }) => {
  return (
    <aside
      className="dark:bg-gray-400 bg-gray-200 py-6 pl-6"
      style={{
        flexBasis: width,
      }}
    >
      {data.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => clickHandler(index)}
            className={`group flex items-center justify-center py-6 cursor-pointer ${currentIndex === index ? "bg-white dark:bg-gray-200 text-black" : "bg-transparent text-[#4a5565] dark:text-gray-800"}`}
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
