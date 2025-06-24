const Ui1Shimmer = () => {
    const arr = Array.from({ length: 12 }, (_, i) => i)

    return <div className="flex flex-col w-full mx-auto gap-5 mt-16 items-center">
        <div className="w-52 h-8 rounded shimmerBg mt-3 self-start"></div>
        <div className="flex flex-wrap gap-12 md:gap-7 justify-center w-full">
            {arr.map(item => {
                return <div key={item} className="shimmerBg h-32 md:w-28 w-32 rounded-xl shrink-0">
                </div>
            })}
        </div>
    </div>
}

export default Ui1Shimmer;