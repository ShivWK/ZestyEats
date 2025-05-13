const ShowMoreBtn = ({ handleClick }) => {
  return (
    <button
      onClick={ handleClick }
      className="flex items-center justify-center gap-3 font-bold text-primary w-56 h-16 border-[1px] border-gray-400 px-5 rounded-2xl cursor-pointer active:scale-95 hover:text-white hover:bg-primary transition-all duration-100 ease-in-out"
    >
      Show More
      <i className="fa-solid fa-caret-down"></i>
    </button>
  );
};

export default ShowMoreBtn;