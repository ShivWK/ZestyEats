import { useEffect, useState } from 'react';

const CuisineShimmer = () => {
  function calArray() {
    const isLarge = window.innerWidth >= 768;
    return { topOnline: Array.from({ length: isLarge ? 8 : 9 }, (_, i) => i) };
  }

  const [mappingArrays, setMappingArrays] = useState(calArray());

  useEffect(() => {
    const handleResize = () => {
      setMappingArrays(calArray());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { topOnline } = mappingArrays;

  return (
    <div className={`flex w-full flex-col gap-2 md:mt-2 md:gap-3`}>
      <div
        id="banner"
        className="shimmerBg mt-0.5 mb-4 flex h-[30vh] w-full flex-col bg-cover max-md:rounded-e-4xl max-md:bg-right md:mt-1 md:h-[50vh] md:rounded-t-4xl"
      ></div>
      <div className="description shimmerBg h-7 w-72 rounded-md md:w-3xl"></div>

      <div className="flex flex-wrap items-center justify-start gap-2.5 gap-y-5 p-3">
        {topOnline.map((index) => (
          <div
            key={index}
            className="flex h-52 w-full shrink-0 flex-row gap-1.5 rounded-2xl border-[1px] border-gray-200 p-1.5 md:h-72 md:w-[250px] md:flex-col md:rounded-xl"
          >
            <div className="shimmerBg h-full basis-1/2 rounded-xl md:basis-[65%]"></div>
            <div className="flex h-full basis-[48%] flex-col items-start justify-center gap-4 md:basis-[35%] md:gap-1.5">
              <div className="shimmerBg h-5 w-[80%] rounded"></div>
              <div className="shimmerBg h-5 w-[50%] rounded"></div>
              <div className="shimmerBg h-5 w-[60%] rounded"></div>
              <div className="shimmerBg h-5 w-[70%] rounded md:hidden"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuisineShimmer;
