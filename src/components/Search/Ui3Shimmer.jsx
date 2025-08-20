const Ui3Shimmer = () => {
    const arr = Array.from({ length: 15 }, (_, i) => i);

    return (
        <>
            <div className="flex gap-3 pt-16">
                <div className="h-8 w-20 rounded-3xl shimmerBg"></div>
                <div className="h-8 w-20 rounded-3xl shimmerBg"></div>
            </div>
            <div className="flex flex-wrap gap-2.5 gap-y-4 w-full justify-between mt-2.5 bg-gray-200  p-1.5 rounded-md">
                {arr.map((i) => {
                    return (
                        <div key={i} className="basis-full  md:basis-[49%] border-2 border-gray-300 dark:border-gray-400 rounded-md bg-white dark:bg-gray-300">
                            <div className="flex flex-col gap-2 p-4">
                                <div className="h-4 w-36 shimmerBg rounded"></div>
                                <div className="h-4 w-20 shimmerBg rounded"></div>
                            </div>
                            <hr className="text-gray-300 dark:text-gray-400 my-1.5" />
                            <div className="flex justify-between bg-white dark:bg-gray-300">
                                <div className="flex flex-col gap-3 p-4">
                                    <div className="h-4 w-36 shimmerBg rounded"></div>
                                    <div className="h-4 w-32 shimmerBg rounded"></div>
                                    <div className="h-4 w-20 shimmerBg rounded"></div>
                                </div>
                                <div className="h-36 w-36 shimmerBg rounded m-1.5 bg-white dark:bg-gray-300" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>

    );
};

export default Ui3Shimmer;
