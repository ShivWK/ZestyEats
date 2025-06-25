import { useEffect, useState } from "react";

const HomeShimmer = () => {
    function calArray() {
        const isLarge = window.innerWidth >= 768;

        return {
            foodie : Array.from({ length: isLarge ? 6 : 5 }, (_, i) => i),
            topChain : Array.from({ length: isLarge ? 8 : 9 }, (_, i) => i),
            bestPlaces : Array.from({ length: isLarge ? 8 : 9 }, (_, i) => i),
        }
    }

    const [mappingArrays, setMappingArrays] = useState(calArray());

    useEffect(() => {
        const handleResize = () => {
            setMappingArrays(calArray());
        }

        // if u put outside the useEffect then on each rerender a new listner will will be attaiched to the window  = memory leak
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const { foodie, topChain, bestPlaces } = mappingArrays;

    return (
        <div className="w-full flex flex-col gap-3 mt-5">
            <div className="foodieThoughts flex justify-between border-2 border-gray-200 rounded p-5">
                {foodie.map((i) => {
                    return (
                        <div key={i} className="flex flex-col items-center justify-center gap-4">
                            <div className="rounded-full h-12 w-12 md:h-24 md:w-24 shimmerBg"></div>
                            <div className="w-12 h-3 md:w-16 md:h-5 shimmerBg rounded-2xl"></div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-around items-center p-3 flex-wrap gap-y-5">
                {topChain.map((i) => (
                    <div key={i} className="w-28 h-20 md:w-60 md:h-44 rounded-xl shimmerBg shrink-0"></div>
                ))}
            </div>
            <hr className="text-gray-300 my-2" />
            <div className="flex justify-around gap-x-4 gap-y-4 md:gap-y-5 flex-wrap max-md:px-3">
                {bestPlaces.map((i) => (
                    <div key={i} className="w-24 h-10 md:w-60 md:h-20 rounded-xl shimmerBg shrink-0"></div>
                ))}
            </div>
            <hr className="text-gray-300 my-3" />
        </div>
    );
};

export default HomeShimmer;
