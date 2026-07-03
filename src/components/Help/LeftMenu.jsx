//  Done

const LeftMenu = ({ data, width, clickHandler, currentIndex }) => {
  console.log('help/LeftMenu rendered');
  return (
    <aside
      className="bg-gray-200 py-6 pl-6 dark:bg-gray-400"
      style={{
        flexBasis: width,
      }}
    >
      {data.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => clickHandler(index)}
            className={`group flex cursor-pointer items-center justify-center py-6 ${currentIndex === index ? 'bg-white text-black dark:bg-gray-200' : 'bg-transparent text-[#4a5565] dark:text-gray-800'}`}
          >
            <p className="font-bold select-none group-hover:text-black">
              {item}
            </p>
          </div>
        );
      })}
    </aside>
  );
};

export default LeftMenu;
