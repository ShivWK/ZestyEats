const Filter = ({ fixed = false, applied = false, icon, text, count = 0 }) => {
  return (
    <div
      className={`flex justify-between gap-2 px-3 h-10 items-center text-sm font-medium text-gray-900 rounded-3xl w-fit border-2 ${
        applied ? "bg-gray-200" : "bg-white"
      } border-gray-400 cursor-pointer hover:bg-gray-200`}
    >
      {count !== 0 && (
        <div className="flex shrink-0 w-5 h-5 p-2 justify-center items-center rounded-[50%] bg-primary text-white font-medium">
          {count}
        </div>
      )}
      <p>{text}</p>
      {fixed ? (
        <button className="cursor-pointer">
          <i className={icon}></i>
        </button>
      ) : (
        applied && (
          <button className="group cursor-pointer">
            <i className="ri-close-large-fill group-hover:shadow-[inset_0_0_5px_5px_rgba(0,0,0,0.2)] rounded-[50%] transition-all duration-150 ease-in-out p-[1px]"></i>
          </button>
        )
      )}
    </div>
  );
};

export default Filter;
