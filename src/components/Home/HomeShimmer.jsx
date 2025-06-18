const HomeShimmer = () => {
    const foodieThoughtsArray = Array.from({ length: 6 }, (_, i) => i);
    const topRestroChainArray = Array.from({ length: 8 }, (_, i) => i);
    const bestPlacesToEat = Array.from({ length: 8 }, (_, i) => i);

    return (
        <div className="w-full flex flex-col gap-2.5 mt-5">
            <div className="foodieThoughts flex justify-between border-2 border-gray-200 rounded p-5">
                {foodieThoughtsArray.map((i) => {
                    return (
                        <div key={i} className="flex flex-col items-center justify-center gap-4">
                            <div className="rounded-[50%] h-24 w-24 shimmerBg"></div>
                            <div className="w-16 h-5 shimmerBg rounded-2xl"></div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-between items-center p-3 flex-wrap gap-y-5">
                {topRestroChainArray.map((i) => (
                    <div key={i} className="w-60 h-44 rounded-xl shimmerBg shrink-0"></div>
                ))}
            </div>
            <hr className="text-gray-300 my-3" />
            <div className="flex justify-between gap-x-4 gap-y-5 flex-wrap">
                {bestPlacesToEat.map((i) => (
                    <div key={i} className="w-60 h-20 rounded-xl shimmerBg shrink-0"></div>
                ))}
            </div>
            <hr className="text-gray-300 my-3" />
        </div>
    );
};

export default HomeShimmer;
