const Ui1Shimmer = () => {
    const arr = Array.from({ length: 12 }, (_, i) => i)

    return <div className="flex flex-col w-fit mx-auto gap-5 mt-4">
        <div className="w-64 h-8 rounded shimmerBg"></div>
        <div className="flex flex-wrap gap-3">
            {arr.map(item => {
                return <div key={item} className="shimmerBg h-40 w-32 rounded-xl shrink-0">
                </div>
            })}
        </div>
    </div>
}

export default Ui1Shimmer;