const Ui4Shimmer = () => {
  const arr = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 bg-gray-300 px-1 pt-18">
      {arr.map((i) => {
        return (
          <div
            key={i}
            className="flex w-1/2 shrink-0 basis-full cursor-pointer gap-3 border-[1px] border-gray-300 bg-white px-2 pt-2 pb-8 md:basis-[49%]"
          >
            <div className="shimmerBg h-28 w-[100px] shrink-0 rounded-md object-cover" />
            <div className="flex flex-col justify-center gap-2">
              <div className="shimmerBg h-5 w-48 md:h-6 md:w-64" />
              <div className="shimmerBg h-5 w-32 md:h-6" />
              <div className="shimmerBg h-4 w-52 md:h-5 md:w-60" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Ui4Shimmer;
