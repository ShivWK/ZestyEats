const ShimmerContainer = () => {
  const arr = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="flex flex-col gap-5 w-full max-w-[1210px] pt-24 p-3 mx-auto">
      <div className="heading rounded-md w-xl h-9 shimmerBg"></div>
      <div className="description rounded-md w-3xl h-7 shimmerBg"></div>
      <div className="shorter rounded-md flex gap-3">
        <div className="h-9 w-20 rounded-3xl shimmerBg"></div>
        <div className="h-9 w-20 rounded-3xl shimmerBg"></div>
        <div className="h-9 w-20 rounded-3xl shimmerBg"></div>
      </div>
      <div className="restro-count rounded-md w-3xs h-7 shimmerBg"></div>
      <div className="flex w-full gap-6 p-1 flex-wrap">
        {arr.map((item, index) => {
          return (
            <div key={index} className="w-[270px] h-52 rounded-xl shimmerBg shrink-0"></div>
          );
        })}
      </div>
    </div>
  );
};

export default ShimmerContainer;
