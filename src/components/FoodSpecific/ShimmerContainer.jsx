// Done

import dummyArray from './../../utils/DummyArray';

const ShimmerContainer = () => {
  // console.log("FoodSpecific Shimmer rendered")
  const SHIMMER_ARRAY = dummyArray(8);

  return (
    <main className="mx-auto flex w-full flex-col gap-3 p-3 pt-20 md:max-w-[1210px] md:gap-5 md:pt-32">
      <div className="shimmerBg h-5 w-[60%] rounded-md md:h-4" />
      <div className="heading shimmerBg h-10 w-64 rounded-md md:h-9 md:w-xl"></div>
      <div className="description shimmerBg h-6 w-72 rounded-md md:h-7 md:w-3xl"></div>
      <div className="shorter flex gap-3 rounded-md">
        <div className="shimmerBg h-9 w-20 rounded-3xl"></div>
        <div className="shimmerBg h-9 w-28 rounded-3xl"></div>
      </div>
      <div className="restaurant-count shimmerBg h-7 w-3xs rounded-md"></div>
      <div className="flex w-full flex-col flex-wrap gap-3 p-1 max-md:px-2 md:flex-row md:gap-6">
        {SHIMMER_ARRAY.map((_, index) => {
          return (
            <div
              key={index}
              className="flex h-52 w-full shrink-0 flex-row gap-1.5 rounded-2xl border-[1px] border-gray-200 p-1.5 md:h-72 md:w-[270px] md:flex-col md:rounded-xl"
            >
              <div className="shimmerBg h-full basis-1/2 rounded-xl md:basis-[65%]"></div>
              <div className="flex h-full basis-[48%] flex-col items-start justify-center gap-4 md:basis-[35%] md:gap-1.5">
                <div className="shimmerBg h-5 w-[80%] rounded"></div>
                <div className="shimmerBg h-5 w-[50%] rounded"></div>
                <div className="shimmerBg h-5 w-[60%] rounded"></div>
                <div className="shimmerBg h-5 w-[70%] rounded md:hidden"></div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
export default ShimmerContainer;
