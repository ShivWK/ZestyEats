const OrderShimmer = () => {
    const arr = Array.from({ length: 2 }, (_, i) => i);

    return (
        <>
            <div className="flex flex-wrap gap-2.5  w-full justify-between mt-0.5 bg-gray-200 p-1 rounded-md">
                {arr.map((i) => {
                    return (
                        <div key={i} className="basis-full md:basis-[49%] pb-2 border-2 border-gray-300 dark:border-gray-400 rounded-md bg-white dark:bg-gray-300">
                            <div className="flex flex-col gap-2.5 p-3 w-full">
                                <div className="h-4 w-[80%] shimmerBg rounded"></div>
                                <div className="h-3 w-[70%] shimmerBg rounded"></div>
                            </div>
                            <hr className="text-gray-300 dark:text-gray-400 my-0.5" />
                            <div className="flex justify-between bg-white dark:bg-gray-300">
                                <div className="flex flex-col gap-3 p-3 w-full">
                                    <div className="h-4 w-[90%] shimmerBg rounded"></div>
                                    <div className="h-4 w-[80%] shimmerBg rounded"></div>
                                    <div className="h-4 w-[70%] shimmerBg rounded"></div>
                                </div>
                            </div>

                            <div className="mx-auto h-6 w-20 rounded shimmerBg" />
                        </div>
                    );
                })}
            </div>
        </>

    );
};

export default OrderShimmer;
