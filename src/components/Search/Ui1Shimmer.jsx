const Ui1Shimmer = () => {
    const arr = Array.from({ length: 12 }, (_, i) => i)

    return <div className="flex flex-col w-full mx-auto gap-5 mt-16 items-center">
        <div className="w-52 h-7 md:h-8 rounded shimmerBg mt-3 max-d:mb-2 self-start"></div>
        <div className="flex flex-wrap max-md:gap-y-5 md:gap-7 justify-evenly w-full">
            {arr.map(item => {
                return <div key={item} className="shimmerBg h-28 md:h-32 md:w-28 w-24 rounded-xl shrink-0">
                </div>
            })}
        </div>
    </div>
}

export default Ui1Shimmer;