const ShowMoreBtn = ({ handleClick }) => {
  return (
    <button
      onClick={ handleClick }
      className="flex items-center justify-center gap-1.5 md:gap-3 font-bold text-primary w-[48%] md:w-56 py-2 border-[1px] border-gray-400 max-md:text-xl px-5 rounded-2xl cursor-pointer active:scale-95 hover:text-white hover:bg-primary transition-all duration-100 ease-in-out"
    >
      Show More
      <i className="fa-solid fa-caret-down"></i>
    </button>
  );
};

export default ShowMoreBtn;