const ShowMoreBtn = ({ handleClick }) => {
  return (
    <button
      onClick={ handleClick }
      className="flex items-center justify-center gap-2 md:gap-3 font-bold text-primary w-[48%] md:w-56 py-2 border-[1px] border-gray-400 h-10 md:h-12 mt-4 rounded cursor-pointer active:scale-95 hover:text-white hover:bg-primary dark:hover:bg-darkPrimary transition-all duration-100 ease-in-out max-md:active:bg-primary max-md:active:text-white"
    >
      Show More
      <i className="fa-solid fa-caret-down max-md:text-xl"></i>
    </button>
  );
};

export default ShowMoreBtn;