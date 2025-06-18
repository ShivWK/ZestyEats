const Ui2Shimmer = () => {
    const arr = Array.from({ length: 10 }, (_, i) => i);

    return <>
        <div className="p-2">
            {arr.map((item) => {
                return (
                    <div key={item} className="flex gap-4 my-2 p-2 border-2 border-gray-300 rounded">
                        <div className="rounded h-16 w-16 shimmerBg" />
                        <div className="flex flex-col justify-center gap-3 bg-transparent">
                            <div className="h-4 w-36 shimmerBg"></div>
                            <div className="h-4 w-20 shimmerBg"></div>
                        </div>
                    </div>
                );
            })}
        </div>
    </>
}

export default Ui2Shimmer