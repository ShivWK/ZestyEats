const Scrollbar = ({ scrolledPercentage, marginTop }) => {
  // console.log("ScrollBAr from Home rendered")

  return (
    <div
      className={`flex w-full justify-center`}
      style={{ marginTop: `${marginTop}px` }}
    >
      <div
        className="relative h-[3px] w-[70px] rounded-full bg-gray-200"
      >
        <div
          className="bg-primary absolute h-full w-1/6 rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${scrolledPercentage}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Scrollbar;
