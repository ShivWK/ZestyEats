const ShimmerContainer = () => {
  return (
    <div className="mx-auto w-full overflow-hidden px-3 pt-4 md:max-w-[800px] md:px-0">
      {/* <div className="-z-10 shimmer-shine"></div> */}
      <div className="z-10 flex w-full flex-col gap-5 bg-transparent pt-18 pb-12 md:pt-24">
        <div className="shimmerBg h-8 w-52 rounded-xl"></div>
        <div className="shimmerBg h-48 w-full rounded-xl"></div>
        <div className="flex justify-between gap-1.5 overflow-hidden p-2">
          <div className="shimmerBg h-16 w-64 shrink-0 rounded-xl"></div>
          <div className="shimmerBg h-16 w-64 shrink-0 rounded-xl"></div>
          <div className="shimmerBg h-16 w-64 shrink-0 rounded-xl"></div>
        </div>

        <hr className="text-gray-300" />

        <div className="flex justify-between gap-1.5 overflow-hidden">
          <div className="shimmerBg h-60 w-64 shrink-0 rounded-xl"></div>
          <div className="shimmerBg h-60 w-64 shrink-0 rounded-xl"></div>
          <div className="shimmerBg h-60 w-64 shrink-0 rounded-xl"></div>
        </div>

        <hr className="text-gray-300" />

        <div>
          <div className="my-2 flex h-56 w-full flex-col gap-2 rounded-xl border-[1px] border-gray-400 p-3 md:flex-row">
            <div className="shimmerBg h-[65%] basis-[65%] rounded-xl md:order-2 md:basis-[35%]"></div>
            <div className="flex h-full basis-[35%] flex-col items-start justify-center gap-4 md:order-1 md:basis-[65%] md:gap-1.5">
              <div className="shimmerBg h-5 w-[80%] rounded"></div>
              <div className="shimmerBg h-5 w-[50%] rounded"></div>
              <div className="shimmerBg h-5 w-[60%] rounded"></div>
              <div className="shimmerBg h-5 w-[70%] rounded md:hidden"></div>
            </div>
          </div>

          <div className="my-2 flex h-56 w-full flex-col gap-2 rounded-xl border-[1px] border-gray-400 p-3 md:flex-row">
            <div className="shimmerBg h-full basis-1/2 rounded-xl md:order-2 md:basis-[35%]"></div>
            <div className="flex h-full basis-[48%] flex-col items-start justify-center gap-4 md:order-1 md:basis-[65%] md:gap-1.5">
              <div className="shimmerBg h-5 w-[80%] rounded"></div>
              <div className="shimmerBg h-5 w-[50%] rounded"></div>
              <div className="shimmerBg h-5 w-[60%] rounded"></div>
              <div className="shimmerBg h-5 w-[70%] rounded md:hidden"></div>
            </div>
          </div>

          <div className="my-2 flex h-56 w-full flex-col gap-2 rounded-xl border-[1px] border-gray-400 p-3 md:flex-row">
            <div className="shimmerBg h-full basis-1/2 rounded-xl md:order-2 md:basis-[35%]"></div>
            <div className="flex h-full basis-[48%] flex-col items-start justify-center gap-4 md:order-1 md:basis-[65%] md:gap-1.5">
              <div className="shimmerBg h-5 w-[80%] rounded"></div>
              <div className="shimmerBg h-5 w-[50%] rounded"></div>
              <div className="shimmerBg h-5 w-[60%] rounded"></div>
              <div className="shimmerBg h-5 w-[70%] rounded md:hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerContainer;
