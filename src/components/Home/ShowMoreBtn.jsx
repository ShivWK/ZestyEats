// Done

const ShowMoreBtn = ({ handleClick }) => {
  // console.log("ShowMoreBtn rendered")
  return (
    <button
      onClick={handleClick}
      className="text-primary hover:bg-primary dark:hover:bg-darkPrimary max-md:active:bg-primary mt-4 flex h-10 w-[48%] cursor-pointer items-center justify-center gap-2 rounded border-[1px] border-gray-400 py-2 font-bold transition-all duration-100 ease-in-out hover:text-white active:scale-95 max-md:active:text-white md:h-12 md:w-56 md:gap-3"
    >
      Show More
      <i className="fa-solid fa-caret-down max-md:text-xl"></i>
    </button>
  );
};

export default ShowMoreBtn;
