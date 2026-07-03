// Done

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import dummyArray from '../../utils/DummyArray';

const HomeShimmer = () => {
  // console.log("HomeShimmer rendered")
  const [mappingArrays, setMappingArrays] = useState(calArray());
  const pathname = useLocation().pathname;

  function calArray() {
    const isLarge = window.innerWidth >= 768;

    const sizeLarge = isLarge ? 8 : 9;
    const foodieSize = isLarge ? 6 : 5;

    return {
      foodie: dummyArray(foodieSize),
      topChain: dummyArray(4),
      topOnline: dummyArray(sizeLarge),
      bestPlaces: dummyArray(sizeLarge),
    };
  }

  useEffect(() => {
    const handleResize = () => setMappingArrays(calArray());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { foodie, topChain, topOnline, bestPlaces } = mappingArrays;

  return (
    <div className={`mt-2 flex w-full flex-col gap-2 md:mt-2 md:gap-3`}>
      {(pathname.includes('cityPage') || pathname.includes('cityLocality')) && (
        <div
          id="banner"
          className="shimmerBg mt-0.5 mb-8 flex h-[30vh] w-full flex-col bg-cover max-md:rounded-e-4xl max-md:bg-right md:mt-1 md:h-[50vh] md:rounded-t-4xl"
        ></div>
      )}
      <div className="foodieThoughts -mt-3 flex justify-between rounded border-2 border-gray-200 p-5">
        {foodie.map((i) => {
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-4"
            >
              <div className="shimmerBg h-12 w-12 rounded-full md:h-24 md:w-24"></div>
              <div className="shimmerBg h-3 w-12 rounded-2xl md:h-5 md:w-16"></div>
            </div>
          );
        })}
      </div>

      <hr className="my-2 text-gray-300" />

      <div className="flex justify-between overflow-hidden">
        {topChain.map((index) => (
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

      <hr className="my-2 text-gray-300" />

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

      <hr className="my-2 text-gray-300" />

      {!pathname.includes('cityLocality') && (
        <div className="mt-1 flex flex-wrap justify-around gap-x-4 gap-y-4 max-md:px-3 md:mb-2 md:gap-y-5">
          {bestPlaces.map((i) => (
            <div
              key={i}
              className="shimmerBg h-10 w-[100px] shrink-0 rounded-xl md:h-20 md:w-60"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeShimmer;
