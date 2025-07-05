const ShimmerContainer = () => {
  return (
    <div className="w-full md:max-w-[800px] px-3 md:px-0 mx-auto overflow-hidden pt-4">
      {/* <div className="-z-10 shimmer-shine"></div> */}
      <div className="z-10 bg-transparent flex gap-5 flex-col md:pt-24 pt-18 pb-12 w-full">
        <div className="w-52 h-8 rounded-xl shimmerBg"></div>
        <div className="w-full h-48 rounded-xl shimmerBg"></div>
        <div className="flex p-2 gap-1.5 justify-between overflow-hidden">
          <div className="w-64 h-16 rounded-xl shimmerBg shrink-0"></div>
          <div className="w-64 h-16 rounded-xl shimmerBg shrink-0"></div>
          <div className="w-64 h-16 rounded-xl shimmerBg shrink-0"></div>
        </div>

        <hr className="text-gray-300" />

        <div className="flex gap-1.5 justify-between overflow-hidden">
          <div className="w-64 h-60 rounded-xl shimmerBg shrink-0"></div>
          <div className="w-64 h-60 rounded-xl shimmerBg shrink-0"></div>
          <div className="w-64 h-60 rounded-xl shimmerBg shrink-0"></div>
        </div>

        <hr className="text-gray-300" />

        <div>
          <div className="w-full p-3 h-56 rounded-xl gap-2 my-2 flex flex-col md:flex-row border-[1px] border-gray-400">
            <div className="basis-[65%] md:basis-[35%] h-[65%] shimmerBg rounded-xl md:order-2"></div>
            <div className="h-full basis-[35%] md:basis-[65%] flex md:gap-1.5 gap-4 items-start justify-center flex-col md:order-1">
              <div className="h-5 w-[80%] rounded shimmerBg"></div>
              <div className="h-5 w-[50%] rounded shimmerBg"></div>
              <div className="h-5 w-[60%] rounded shimmerBg"></div>
              <div className="md:hidden h-5 w-[70%] rounded shimmerBg"></div>
            </div>
          </div>

          <div className="w-full p-3 h-56 rounded-xl gap-2 my-2 flex flex-col md:flex-row border-[1px] border-gray-400">
            <div className="basis-1/2 md:basis-[35%] h-full shimmerBg rounded-xl md:order-2"></div>
            <div className="h-full basis-[48%] md:basis-[65%] flex md:gap-1.5 gap-4 items-start justify-center flex-col md:order-1">
              <div className="h-5 w-[80%] rounded shimmerBg"></div>
              <div className="h-5 w-[50%] rounded shimmerBg"></div>
              <div className="h-5 w-[60%] rounded shimmerBg"></div>
              <div className="md:hidden h-5 w-[70%] rounded shimmerBg"></div>
            </div>
          </div>

          <div className="w-full p-3 h-56 rounded-xl gap-2 my-2 flex flex-col md:flex-row border-[1px] border-gray-400">
            <div className="basis-1/2 md:basis-[35%] h-full shimmerBg rounded-xl md:order-2"></div>
            <div className="h-full basis-[48%] md:basis-[65%] flex md:gap-1.5 gap-4 items-start justify-center flex-col md:order-1">
              <div className="h-5 w-[80%] rounded shimmerBg"></div>
              <div className="h-5 w-[50%] rounded shimmerBg"></div>
              <div className="h-5 w-[60%] rounded shimmerBg"></div>
              <div className="md:hidden h-5 w-[70%] rounded shimmerBg"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShimmerContainer;
