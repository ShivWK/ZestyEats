import { NavLink } from "react-router-dom";

const Banner = ({ data }) => {
  const mainData = data?.card?.card?.info;

  return (
    <div
      id="banner"
      className="w-full p-5 bg-linear-[to_top,#adabab9d,#ffffff] my-3 rounded-4xl"
    >
      <div
        id="inner-container"
        className="flex flex-col gap-2.5 rounded-3xl w-full overflow-hidden border-[1px] border-[#adabab9d] bg-white"
      >
        <div className="self-center w-full p-3.5 flex flex-col gap-1.5 mb-2">
          <div id="rating" className="flex gap-2.5 items-center">
            <div className="flex gap-0.5 items-center">
              <i className="ri-user-star-fill text-green-600 text-xl"></i>
              <p className="font-bold">{`${mainData?.avgRatingString}(${mainData?.totalRatingsString})`}</p>
            </div>
            <p className="text-gray-500">•</p>
            <p className="font-bold">{mainData?.costForTwoMessage}</p>
          </div>
          <div
            id="cuisions"
            className="text-primary font-bold underline text-sm flex gap-1"
          >
            {mainData?.cuisines.length !== 0 &&
              mainData?.cuisines?.map((item, index, array) => {
                if (index == array.length - 1)
                  return <NavLink key={item}>{item}</NavLink>;
                else return <NavLink key={item}>{`${item} ,`}</NavLink>;
              })}
          </div>
          <div id="delivery" className="flex gap-2 mt-2">
            <div className="flex flex-col justify-center items-center p-0">
              <div className="rounded-[50%] p-1 bg-[#a7a5a5]"></div>
              <div className="w-0.5 bg-[#a7a5a5] h-7"></div>
              <div className="rounded-[50%] p-1 bg-[#a7a5a5]"></div>
            </div>
            <div className="flex flex-col gap-4 text-black font-bold text-sm">
              <div className="flex gap-2 p-0">
                <p>Outlet</p>
                <p className="text-gray-600 font-semibold">{mainData?.areaName}</p>
              </div>
              <p>{mainData?.sla?.slaString}</p>
            </div>
          </div>
        </div>
        <div className="bg-linear-[to_left,rgba(255,81,0,0.15),#ffffff] flex items-center py-3.5 px-2.5">
          <div className="flex items-center gap-2">
            <img
              className="h-4"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_86,h_30/v1634558776/swiggy_one/OneLogo_3x.png"
              alt=""
            />
            <p className="text-primary font-bold text-sm">
              Free delivery on orders above ₹199
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
