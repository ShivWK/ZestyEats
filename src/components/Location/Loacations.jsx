const Location = ({ icon, item, handleClick}) => {
  
    return (
    <div
      onClick={() => {handleClick(item)}}
      className="group cursor-pointer border-b-[1px] border-gray-400 py-4 px-7 mt-4"
    >
      <div className="flex gap-2.5">
        <i className={`${icon} text-xl text-gray-500`}></i>
        <div >
          <p className="font-medium group-hover:text-primary text-lg">
            {item?.terms[0]?.value}
          </p>
          <p className="text-sm font-semibold text-gray-400">{item?.terms[1]?.value}{item?.terms[2]?.value}</p>
        </div>
      </div>
    </div>
  );
};

export default Location;

// <i class="ri-map-pin-line"></i>