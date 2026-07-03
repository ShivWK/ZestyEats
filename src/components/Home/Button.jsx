// Done

function Button({ ref, clickHandler, iconClass }) {
  // console.log("Home Button rendered")
  return (
    <button
      ref={ref}
      onClick={clickHandler}
      className="group cursor-pointer"
      whileTap={{ scale: 0.9 }}
    >
      <i
        className={`ri-arrow-${iconClass}-circle-fill text-primary group-active:text-primary text-[40px] transition-all duration-75 ease-in group-disabled:text-gray-400`}
      ></i>
    </button>
  );
}

export default Button;
