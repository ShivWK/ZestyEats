const Ui3Shimmer = () => {
  const arr = Array.from({ length: 15 }, (_, i) => i);

  return (
    <>
      <div className="flex gap-3 pt-16">
        <div className="shimmerBg h-8 w-20 rounded-3xl"></div>
        <div className="shimmerBg h-8 w-20 rounded-3xl"></div>
      </div>
      <div className="mt-2.5 flex w-full flex-wrap justify-between gap-2.5 gap-y-4 rounded-md bg-gray-200 p-1.5">
        {arr.map((i) => {
          return (
            <div
              key={i}
              className="basis-full rounded-md border-2 border-gray-300 bg-white md:basis-[49%] dark:border-gray-400 dark:bg-gray-300"
            >
              <div className="flex flex-col gap-2 p-4">
                <div className="shimmerBg h-4 w-36 rounded"></div>
                <div className="shimmerBg h-4 w-20 rounded"></div>
              </div>
              <hr className="my-1.5 text-gray-300 dark:text-gray-400" />
              <div className="flex justify-between bg-white dark:bg-gray-300">
                <div className="flex flex-col gap-3 p-4">
                  <div className="shimmerBg h-4 w-36 rounded"></div>
                  <div className="shimmerBg h-4 w-32 rounded"></div>
                  <div className="shimmerBg h-4 w-20 rounded"></div>
                </div>
                <div className="shimmerBg m-1.5 h-36 w-36 rounded bg-white dark:bg-gray-300" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Ui3Shimmer;
