import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCurrentRestaurant } from "../../features/home/restaurantsSlice";
import ItemCard from "./ItemCard";
import useCheckStatus from "../../utils/useCheckStatus";

const RestaurantCard = ({ data }) => {
  const dispatch = useDispatch();
  const restaurantData = data[0].metadata || data[0];
  const items = data.slice(1);
  // console.log(restaurantData, items)

  const [lat, lng] = restaurantData.latLong.split(",");

  const status = useCheckStatus(lat, lng, restaurantData.id);

  const id = restaurantData.id;
  const name = restaurantData.name;

  const areaName = restaurantData.areaName;
  const locality = restaurantData.locality;
  let areaOrLocality = locality + ", " + areaName;

  if (areaName === locality) areaOrLocality = locality;

  const citySmall = restaurantData?.slugs?.city;
  const city = citySmall[0].toUpperCase() + citySmall.slice(1) + ".";

  const ClickHandler = () => {
    dispatch(addCurrentRestaurant(name));
  };

  return (
    <section className="md:basis-[59%] flex flex-col gap-2">
      <div className="bg-white rounded-md p-2 pb-3">
        <div className="w-full flex flex-col gap-1">
          <Link
            to={`/restaurantSpecific/${lat}/${lng}/${id}/${name}`}
            onClick={ClickHandler}
            className="group flex items-center justify-between"
          >
            <p className="basis-[95%] truncate text-xl font-bold select-none">
              {name}
            </p>
            <i className="basis-[4%] ri-arrow-right-long-fill text-2xl text-gray-800 cursor-pointer transform group-hover:translate-x-[6px] transition-all duration-200 ease-in-out p-0"></i>
          </Link>

          <p className="text-sm font-bold text-gray-700 truncate -mt-1">
            {areaOrLocality + ", " + city}
          </p>

          <div className="flex gap-1.5 items-center text-gray-500 font-semibold text-sm">
            <i className="ri-star-fill text-green-700 mb-0.5" />
            <p>{restaurantData?.avgRating}</p>
            <p>•</p>
            <p>{restaurantData?.sla?.slaString || "25-30 MINS"}</p>

            {!status.loading ? (
              <>
                <p>•</p>
                <p
                  className={`${
                    status.opened ? "text-green-500" : "text-red-600"
                  } font-semibold`}
                >
                  {status.opened ? "OPEN 😊" : "CLOSED 😟"}
                </p>
                <p className="hidden md:inline">•</p>
                <div className="hidden md:flex items-center gap-1">
                  {!status.isDeliverable ? (
                    <>
                      <p className="text-red-500 font-medium">
                        (Not delivering to your area)
                      </p>
                      <div className="relative flex gap-1.5 items-center">
                        <div id="No delivery" className="relative mt-0.5">
                          <i className="fas fa-shipping-fast text-black"></i>
                          <div className="absolute ml-2 -bottom-0.5 h-6 w-0.5 bg-red-500 transform rotate-45"></div>
                          {/* <div className="absolute ml-2 -bottom-0.5 h-6 w-0.5 bg-red-500 transform -rotate-45"></div> */}
                        </div>
                        {status.distance && (
                          <p className="text-gray-600 font-normal">
                            ({status.distance} kms)
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-1">
                      <p className="text-green-500 font-medium">
                        (delivering to your area)
                      </p>
                      <i className="fas fa-shipping-fast text-black mt-0.5"></i>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="h-4 w-[50%] shimmerBg rounded max-md:hidden" />
                <div className="h-4 w-[22%] shimmerBg rounded md:hidden" />
              </>
            )}
          </div>
          <div className="md:hidden">
            {status.loading ? (
              <div className="h-4 w-[50%] shimmerBg rounded md:hidden my-[3px]" />
            ) : !status.isDeliverable ? (
              <div className="-my-0.5 flex items-center gap-1">
                <p className="text-red-500 font-medium text-sm">
                  (Not delivering to your area)
                </p>
                <div className="relative flex gap-1.5 items-center">
                  <div id="No delivery" className="relative mt-0.5">
                    <i className="fas fa-shipping-fast text-sm text-black"></i>
                    <div className="absolute ml-2 bottom-0 h-6 w-0.5 bg-red-500 transform rotate-45"></div>
                    {/* <div className="absolute ml-2 bottom-0 h-6 w-0.5 bg-red-500 transform -rotate-45"></div> */}
                  </div>
                 {status.distance && <p className="text-gray-600 text-sm">
                    ({status.distance} kms)
                  </p>}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 my-[1px]">
                <p className="text-green-500 font-medium text-sm">
                  (deliverable to your area)
                </p>
                <i className="fas fa-shipping-fast text-sm text-black mt-0.5"></i>
              </div>
            )}
          </div>
        </div>
        <hr className="text-gray-400 my-2 md:my-3" />
        <div className="md:px-1 flex flex-col gap-2">
          {items.map((data) => (
            <ItemCard
              key={data.item.id}
              data={data}
              restaurantData={restaurantData}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantCard;
