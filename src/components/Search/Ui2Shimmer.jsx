const Ui2Shimmer = () => {
  const arr = Array.from({ length: 10 }, (_, i) => i);

  return (
    <>
      <div className="mt-14 p-2">
        {arr.map((item) => {
          return (
            <div
              key={item}
              className="my-2 flex gap-4 rounded border-2 border-gray-300 p-2"
            >
              <div className="shimmerBg h-16 w-16 rounded" />
              <div className="flex flex-col justify-center gap-3 bg-transparent">
                <div className="shimmerBg h-4 w-36"></div>
                <div className="shimmerBg h-4 w-20"></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Ui2Shimmer;
