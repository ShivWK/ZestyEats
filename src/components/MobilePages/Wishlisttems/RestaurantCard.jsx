import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectItemsToBeAddedInCart,
  selectWishlistItems,
  setItemToCart,
  selectCart,
  deleteItemFromWishlist,
  toggleItemsToBeAddedInCart,
  setMenuItems,
} from "../../../features/home/restaurantsSlice";
import { toast } from "react-toastify";
import { selectLatAndLng } from "../../../features/home/homeSlice";
import haversineFormula from "./../../../utils/haversineFormula";
import useCheckStatus from "./../../../utils/useCheckStatus";

const RestaurantCard = ({ data }) => {
  // console.log(data)

  const metadata = data.restro.metadata;
  const [lat, lng] = metadata?.latLong.split(",") || data.restro.latLong.split(",");

  const restro_id = metadata?.id || data.restro.id;
  const status = useCheckStatus(lat, lng, restro_id);

  const name = metadata?.name || data.restro.name;
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);
  const wishlist = useSelector(selectWishlistItems);
  const itemsToAddInCart = useSelector(selectItemsToBeAddedInCart);
  const restroItemsArray = itemsToAddInCart[restro_id] || [];

  const [itemsCount, setItemsCount] = useState(restroItemsArray.length);

  const areaName = data.restro.metadata?.areaName || data.restro.areaName;
  const locality = data.restro.metadata?.locality || data.restro.locality;
  let areaOrLocality = locality + ", " + areaName;

  if (areaName === locality) areaOrLocality = locality;

  const citySmall = data.restro.metadata?.slugs?.city || data.restro.slugs.city;
  const city = citySmall[0].toUpperCase() + citySmall.slice(1) + ".";

  useEffect(() => {
    setItemsCount(itemsToAddInCart[restro_id]?.length || 0);
    localStorage.setItem(
      "ItemsToBeAddedInCart",
      JSON.stringify(itemsToAddInCart)
    );
  }, [itemsToAddInCart]);

  const addItemsToCart = () => {
    if (restroItemsArray.length === 0) {
      toast.info("You haven't selected any items to move.", {
        autoClose: 3000,
        style: {
          backgroundColor: "#ff5200",
          color: "white",
          fontWeight: "medium",
        },
        progressClassName: "progress-style",
      });
      return;
    }

    const [firstKey] = Object.keys(cart);
    const presentRestaurant =
      cart[firstKey]?.restaurantData?.metadata?.id ||
      cart[firstKey]?.restaurantData?.id;

    if (presentRestaurant && presentRestaurant !== restro_id) {
      toast.info("Clear cart to add items from this restaurant.", {
        autoClose: 3000,
        style: {
          backgroundColor: "red",
          color: "white",
          fontWeight: "medium",
        },
        progressClassName: "progress-style",
      });
      return;
    }

    for (const element of restroItemsArray) {
      dispatch(
        setItemToCart({
          add: true,
          id: element,
          data: wishlist[element],
        })
      );

      dispatch(deleteItemFromWishlist(element));
      dispatch(
        toggleItemsToBeAddedInCart({
          add: false,
          id: element,
          restro_id,
        })
      );
    }
  };

  const ClickHandler = () => {
    dispatch(setMenuItems({ mode: "empty" }));
  };

  return (
    <section className="border-2 border-gray-300 rounded m-0.5 my-2">
      <div className="p-1.5 w-full flex flex-col gap-0.5">
        <Link
          to={`/restaurantSpecific/${lat}/${lng}/${restro_id}/${name}`}
          onClick={ClickHandler}
          className="flex items-center justify-between"
        >
          <p className="basis-[90%] truncate text-xl font-bold select-none">
            {name}
          </p>
          <div className="basis-[8%] active:text-primary">
            <i className="ri-arrow-right-long-fill text-2xl text-gray-800 cursor-pointer transform group-hover:translate-x-[6px] transition-all duration-150 ease-in-out p-0"></i>
          </div>
        </Link>

        <p className="text-xs font-bold text-gray-700 truncate -mt-1">
          {areaOrLocality + ", " + city}
        </p>

        {status.loading ? (
          <div className="h-4 rounded shimmerBg w-[45%] mb-0.5"></div>
        ) : (
          <div className="flex items-center gap-1.5 -mt-0.5">
            <p
              className={`${
                status.opened ? "text-green-500" : "text-red-600"
              } text-sm font-semibold`}
            >
              {status.opened ? "OPEN 😊" : "CLOSED 😟"}
            </p>
            {!status.isDeliverable ? (
              <div className="relative flex gap-1.5 text-sm items-center">
                <p>•</p>
                <div id="No delivery" className="relative">
                  <i className="fas fa-shipping-fast text-black"></i>
                  <div className="absolute ml-2 -bottom-0.5 h-6 w-0.5 bg-red-500 transform rotate-45 rounded"></div>
                </div>
                {status.distance && <p className="text-gray-600">({status.distance} kms)</p>}
              </div>
            ) : (
              <div className="relative flex gap-1.5 text-sm items-center">
                <p>•</p>
                <div id="delivery" className="relative">
                  <i className="fas fa-shipping-fast text-black"></i>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="basis-[43%]">
            <div className="flex gap-1 items-center text-gray-500 font-semibold text-sm">
              <i className="ri-star-fill text-green-700 mb-0.5" />
              <p>{metadata?.avgRating || data.restro.avgRating}</p>
              <p>•</p>
              <p>
                {metadata?.sla?.slaString ||
                  data.restro.sla.slaString ||
                  "25-30 MINS"}
              </p>
            </div>
          </div>
          <div className="basis-[57%] flex">
            <button
              onClick={addItemsToCart}
              className="bg-green-500 inline-block text-white ml-auto font-semibold px-2 py-0.5 rounded active:scale-95 transition-all duration-100 ease-linear"
            >{`Move ${
              itemsCount !== 0
                ? itemsCount > 1
                  ? `${itemsCount} items`
                  : `${itemsCount} item`
                : ""
            } to cart`}</button>
          </div>
        </div>
      </div>
      {data?.item.map((item) => (
        <ItemCard key={item.id} item={item} restro_id={restro_id} />
      ))}
    </section>
  );
};

export default RestaurantCard;
