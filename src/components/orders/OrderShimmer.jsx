// Done
import dummyArray from '../../utils/DummyArray';

const OrderShimmer = () => {
  // console.log("OrderShimmer rendered");
  const arr = dummyArray(2);

  return (
    <>
      <div className="mt-0.5 flex w-full flex-wrap justify-between gap-2.5 rounded-md bg-gray-200 p-1">
        {arr.map((i) => {
          return (
            <div
              key={i}
              className="basis-full rounded-md border-2 border-gray-300 bg-white pb-2 md:basis-[49%] dark:border-gray-400 dark:bg-gray-300"
            >
              <div className="flex w-full flex-col gap-2.5 p-3">
                <div className="shimmerBg h-4 w-[80%] rounded"></div>
                <div className="shimmerBg h-3 w-[70%] rounded"></div>
              </div>
              <hr className="my-0.5 text-gray-300 dark:text-gray-400" />
              <div className="flex justify-between bg-white dark:bg-gray-300">
                <div className="flex w-full flex-col gap-3 p-3">
                  <div className="shimmerBg h-4 w-[90%] rounded"></div>
                  <div className="shimmerBg h-4 w-[80%] rounded"></div>
                  <div className="shimmerBg h-4 w-[70%] rounded"></div>
                </div>
              </div>

              <div className="shimmerBg mx-auto h-6 w-20 rounded" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrderShimmer;
