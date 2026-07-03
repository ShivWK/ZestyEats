const Ui1Shimmer = () => {
  const arr = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="mx-auto mt-16 flex w-full flex-col items-center gap-5">
      <div className="shimmerBg max-d:mb-2 mt-3 h-7 w-52 self-start rounded md:h-8"></div>
      <div className="flex w-full flex-wrap justify-evenly max-md:gap-y-5 md:gap-7">
        {arr.map((item) => {
          return (
            <div
              key={item}
              className="shimmerBg h-36 w-28 shrink-0 rounded-xl md:w-28"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Ui1Shimmer;
