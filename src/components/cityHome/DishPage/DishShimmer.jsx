const DishShimmer = () => {
    const restaurants = Array.from({ length: 5 }, (_, i) => i)
    const itemCards = Array.from({ length: 3 }, (_, i) => i)

    return <main className="w-full md:max-w-[1070px] mx-auto overflow-hidden pb-2 md:pb-6 pt-[5rem] md:pt-28 overflow-x-hidden max-md:px-2 flex flex-col gap-2.5 md:gap-5">
        <div id="breadrumbs" className="rounded-md w-[60%] h-5 md:h-4 shimmerBg" />
        <div className="heading rounded-md w-64 md:w-xl h-9 shimmerBg"></div>
        <section className="flex flex-col gap-0.5 md:gap-1 bg-gray-100 rounded p-2 pb-3 pt-3 md:p-7 mt-2 md:pb-5">
            <div className="h-5 md:h-6 w-[40%] shimmerBg rounded"></div>
            {restaurants.map((_, index) => <div key={index} className="rounded-md border-[1px] flex flex-col justify-center gap-1 border-gray-300 p-2 py-5 mt-3">
                <div className="shimmerBg w-[35%] h-4 md:h-5 rounded"></div>
                <div className="shimmerBg w-[25%] h-3 md:h-4 rounded"></div>
                <div className="shimmerBg w-[20%] h-3 rounded"></div>

                <div className="flex gap-2 items-center overflow-hidden mt-2 md:mt-3">
                    {itemCards.map((_, index) => <div className="border-gray-300 shrink-0 border-2 w-80 md:w-96 p-0.5 px-1 pl-2 rounded-2xl flex justify-between items-center">
                        <div className="flex flex-col gap-3 pl-2 justify-center basis-3/5 shrink-0 rounded-xl h-32 border-gray-300 border-[1px]" >
                            <div className="shimmerBg w-[80%] h-4 md:h-5 rounded"></div>
                            <div className="shimmerBg w-[70%] h-3 md:h-4 rounded"></div>
                            <div className="shimmerBg w-[50%] h-3 rounded"></div>
                        </div>

                        <div className="relative flex flex-col basis-[35%] h-32 w-28 rounded-xl overflow-hidden shrink-0 m-2 shimmerBg" />
                    </div>)}
                </div>
            </div>)}
            <div className="shimmerBg w-[25%] md:w-[10%] h-7 self-center rounded"></div>
        </section>
    </main>
}

export default DishShimmer;