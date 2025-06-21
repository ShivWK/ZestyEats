const ShimmerContainer = () => {
  return (
      <div className="w-full md:max-w-[800px] px-3 md:px-0 mx-auto overflow-hidden pt-4">
        {/* <div className="-z-10 shimmer-shine"></div> */}
        <div className="z-10 bg-transparent flex gap-5 flex-col pt-24 pb-12 w-full">
          <div className="w-52 h-8 rounded-xl shimmerBg"></div>
          <div className="w-full h-48 rounded-xl shimmerBg"></div>
          <div className="flex p-2 gap-1.5 justify-between">
            <div className="w-64 h-16 rounded-xl shimmerBg"></div>
            <div className="w-64 h-16 rounded-xl shimmerBg"></div>
            <div className="w-64 h-16 rounded-xl shimmerBg"></div>
          </div>
          <hr className="text-gray-300" />
          <div className="flex gap-1.5 justify-between">
            <div className="w-64 h-60 rounded-xl shimmerBg"></div>
            <div className="w-64 h-60 rounded-xl shimmerBg"></div>
            <div className="w-64 h-60 rounded-xl shimmerBg"></div>
          </div>
          <hr className="text-gray-300" />
          <div className="w-full h-56 rounded-xl shimmerBg"></div>
        </div>
      </div>
  );
};

export default ShimmerContainer;
