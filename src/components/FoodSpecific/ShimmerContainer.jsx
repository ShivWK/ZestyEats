const ShimmerContainer = () => {
  const arr = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="flex flex-col gap-3 md:gap-5 w-full md:max-w-[1210px] pt-20 md:pt-32 p-3 mx-auto">
      <div className="rounded-md w-[60%] h-5 md:h-4 shimmerBg" />
      <div className="heading rounded-md w-64 md:w-xl h-10 md:h-9 shimmerBg"></div>
      <div className="description rounded-md w-72 md:w-3xl h-6 md:h-7 shimmerBg"></div>
      <div className="shorter rounded-md flex gap-3">
        <div className="h-9 w-20 rounded-3xl shimmerBg"></div>
        <div className="h-9 w-20 rounded-3xl shimmerBg"></div>
      </div>
      <div className="restaurant-count rounded-md w-3xs h-7 shimmerBg"></div>
      <div className="flex w-full gap-3 flex-col md:flex-row md:gap-6 p-1 max-md:px-2 flex-wrap">
        {arr.map((item, index) => {
          return (
            <div key={index} className="w-full md:w-[270px] h-52 md:h-72 rounded-2xl md:rounded-xl shrink-0 flex md:flex-col flex-row gap-1.5 p-1.5 border-[1px] border-gray-200">
              <div className="basis-1/2 md:basis-[65%] h-full shimmerBg rounded-xl"></div>
              <div className="h-full basis-[48%] md:basis-[35%] flex md:gap-1.5 gap-4 items-start justify-center flex-col">
                <div className="h-5 w-[80%] rounded shimmerBg"></div>
                <div className="h-5 w-[50%] rounded shimmerBg"></div>
                <div className="h-5 w-[60%] rounded shimmerBg"></div>
                <div className="md:hidden h-5 w-[70%] rounded shimmerBg"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShimmerContainer;
