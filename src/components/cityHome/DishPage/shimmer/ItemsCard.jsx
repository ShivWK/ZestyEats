const ItemCard = () => {
  return (
    <div className="flex w-80 shrink-0 items-center justify-between rounded-2xl border-2 border-gray-300 p-0.5 px-1 pl-2 md:w-96">
      <div className="flex h-32 shrink-0 basis-3/5 flex-col justify-center gap-3 rounded-xl border-[1px] border-gray-300 pl-2">
        <div className="shimmerBg h-4 w-[80%] rounded md:h-5"></div>
        <div className="shimmerBg h-3 w-[70%] rounded md:h-4"></div>
        <div className="shimmerBg h-3 w-[50%] rounded"></div>
      </div>

      <div className="shimmerBg relative m-2 flex h-32 w-28 shrink-0 basis-[35%] flex-col overflow-hidden rounded-xl" />
    </div>
  );
};

export default ItemCard;
