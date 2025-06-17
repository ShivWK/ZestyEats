const Ui1Shimmer = () => {
    const arr = Array.from({length : 12}, (_, i) => i)

    return <div className="flex pt-24 w-full mx-auto">
        {arr.map(item => {
            return <div className="shimmer-bg h-24 w-16 rounded-xl">

            </div>
        })}
    </div>
}

export default Ui1Shimmer;