import RestaurantCard from './RestaurantCard';

const DishShimmer = () => {
  // const restaurants = Array.from({ length: 5 }, (_, i) => i)
  // const itemCards = Array.from({ length: 3 }, (_, i) => i)

  return (
    <main className="mx-auto flex w-full flex-col gap-2.5 overflow-hidden overflow-x-hidden pt-[5rem] pb-2 max-md:px-2 md:max-w-[1070px] md:gap-5 md:pt-28 md:pb-6">
      <div id="breadrumbs" className="shimmerBg h-5 w-[60%] rounded-md" />
      <div className="heading shimmerBg h-9 w-64 rounded-md md:w-xl"></div>
      <section className="mt-2 flex flex-col gap-0.5 rounded bg-gray-100 p-2 pt-3 pb-3 md:gap-1 md:p-7 md:pb-5">
        <div className="shimmerBg h-5 w-[40%] rounded md:h-6"></div>
        {/* {restaurants.map((_, index) => <div key={index} className="rounded-md border-[1px] flex flex-col justify-center gap-1 border-gray-300 p-2 py-5 mt-3">
                <div className="shimmerBg w-[35%] h-4 md:h-5 rounded"></div>
                <div className="shimmerBg w-[25%] h-3 md:h-4 rounded"></div>
                <div className="shimmerBg w-[20%] h-3 rounded"></div>

                <div className="flex gap-2 items-center overflow-hidden mt-2 md:mt-3">
                    {itemCards.map((_, index) => <div key={index} className="border-gray-300 shrink-0 border-2 w-80 md:w-96 p-0.5 px-1 pl-2 rounded-2xl flex justify-between items-center">
                        <div className="flex flex-col gap-3 pl-2 justify-center basis-3/5 shrink-0 rounded-xl h-32 border-gray-300 border-[1px]" >
                            <div className="shimmerBg w-[80%] h-4 md:h-5 rounded"></div>
                            <div className="shimmerBg w-[70%] h-3 md:h-4 rounded"></div>
                            <div className="shimmerBg w-[50%] h-3 rounded"></div>
                        </div>

                        <div className="relative flex flex-col basis-[35%] h-32 w-28 rounded-xl overflow-hidden shrink-0 m-2 shimmerBg" />
                    </div>)}
                </div>
            </div>)} */}
        <RestaurantCard />
        <div className="shimmerBg mt-3 h-7 w-[25%] self-center rounded md:w-[10%]"></div>
      </section>
    </main>
  );
};

export default DishShimmer;
