const ItemCard = () => {
    return (
        <div className="border-gray-300 shrink-0 border-2 w-80 md:w-96 p-0.5 px-1 pl-2 rounded-2xl flex justify-between items-center">
            <div className="flex flex-col gap-3 pl-2 justify-center basis-3/5 shrink-0 rounded-xl h-32 border-gray-300 border-[1px]" >
                <div className="shimmerBg w-[80%] h-4 md:h-5 rounded"></div>
                <div className="shimmerBg w-[70%] h-3 md:h-4 rounded"></div>
                <div className="shimmerBg w-[50%] h-3 rounded"></div>
            </div>

            <div className="relative flex flex-col basis-[35%] h-32 w-28 rounded-xl overflow-hidden shrink-0 m-2 shimmerBg" />
        </div>
    )
}

export default ItemCard;