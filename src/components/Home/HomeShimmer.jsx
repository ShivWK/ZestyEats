import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HomeShimmer = () => {
    const pathname = useLocation().pathname;
    function calArray() {
        const isLarge = window.innerWidth >= 768;

        return {
            foodie: Array.from({ length: isLarge ? 6 : 5 }, (_, i) => i),
            topChain: Array.from({ length: 4 }, (_, i) => i),
            topOnline: Array.from({ length: isLarge ? 8 : 9 }, (_, i) => i),
            bestPlaces: Array.from({ length: isLarge ? 8 : 9 }, (_, i) => i),
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

    const { foodie, topChain, topOnline, bestPlaces } = mappingArrays;

    return (
        <div className={`w-full flex flex-col gap-2 md:gap-3 mt-2 md:mt-2`}>
            {(pathname.includes("cityPage") || pathname.includes("cityLocality")) && (
                <div id="banner" className="flex flex-col mt-0.5 md:mt-1 mb-8 w-full bg-cover md:h-[50vh] h-[30vh] shimmerBg max-md:bg-right max-md:rounded-e-4xl md:rounded-t-4xl">
                </div>
            )}
            <div className="foodieThoughts flex justify-between border-2 -mt-3 border-gray-200 rounded p-5">
                {foodie.map((i) => {
                    return (
                        <div key={i} className="flex flex-col items-center justify-center gap-4">
                            <div className="rounded-full h-12 w-12 md:h-24 md:w-24 shimmerBg"></div>
                            <div className="w-12 h-3 md:w-16 md:h-5 shimmerBg rounded-2xl"></div>
                        </div>
                    );
                })}
            </div>

            <hr className="text-gray-300 my-2" />

            <div className="flex justify-between overflow-hidden">
                {topChain.map((index) => <div key={index} className="w-full md:w-[250px] h-52 md:h-72 rounded-2xl md:rounded-xl shrink-0 flex md:flex-col flex-row gap-1.5 p-1.5 border-[1px] border-gray-200">
                    <div className="basis-1/2 md:basis-[65%] h-full shimmerBg rounded-xl"></div>
                    <div className="h-full basis-[48%] md:basis-[35%] flex md:gap-1.5 gap-4 items-start justify-center flex-col">
                        <div className="h-5 w-[80%] rounded shimmerBg"></div>
                        <div className="h-5 w-[50%] rounded shimmerBg"></div>
                        <div className="h-5 w-[60%] rounded shimmerBg"></div>
                        <div className="md:hidden h-5 w-[70%] rounded shimmerBg"></div>
                    </div>
                </div>)
                }
            </div>

            <hr className="text-gray-300 my-2" />

            <div className="flex justify-start gap-2.5 items-center p-3 flex-wrap gap-y-5">
                {topOnline.map((index) => (
                    <div key={index} className="w-full md:w-[250px] h-52 md:h-72 rounded-2xl md:rounded-xl shrink-0 flex md:flex-col flex-row gap-1.5 p-1.5 border-[1px] border-gray-200">
                        <div className="basis-1/2 md:basis-[65%] h-full shimmerBg rounded-xl"></div>
                        <div className="h-full basis-[48%] md:basis-[35%] flex md:gap-1.5 gap-4 items-start justify-center flex-col">
                            <div className="h-5 w-[80%] rounded shimmerBg"></div>
                            <div className="h-5 w-[50%] rounded shimmerBg"></div>
                            <div className="h-5 w-[60%] rounded shimmerBg"></div>
                            <div className="md:hidden h-5 w-[70%] rounded shimmerBg"></div>
                        </div>
                    </div>
                ))}
            </div>

            <hr className="text-gray-300 my-2" />

            {!pathname.includes("cityLocality") && (
                <div className="flex justify-around gap-x-4 gap-y-4 md:gap-y-5 flex-wrap mt-1 max-md:px-3 md:mb-2">
                {bestPlaces.map((i) => (
                    <div key={i} className="w-[100px] h-10 md:w-60 md:h-20 rounded-xl shimmerBg shrink-0"></div>
                ))}
            </div>
            )}
        </div>
    );
};

export default HomeShimmer;
