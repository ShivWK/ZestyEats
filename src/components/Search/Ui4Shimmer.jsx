const Ui4Shimmer = () => {
    const arr = Array.from({ length: 20 }, (_, i) => i);

    return <div className="flex gap-2 flex-wrap pt-18">
        {arr.map(i => {
        return <div key={i}
            className="flex basis-full md:basis-[49%] w-1/2 pt-2 px-2 gap-3 cursor-pointer bg-white pb-8 border-[1px] border-gray-300 shrink-0"
        >
            <div className="object-cover h-28 w-[100px] rounded-md shimmerBg shrink-0" />
            <div className="flex gap-2 md:gap-1 justify-center flex-col">
                <div className="w-48 md:w-64 h-5 md:h-6 shimmerBg" />
                <div className="w-32 h-5 md:h-6 shimmerBg" />
                <div className="w-52 md:w-60 h-4 md:h-5 shimmerBg" />    
            </div>
        </div>
    })}
    </div>
}

export default Ui4Shimmer;