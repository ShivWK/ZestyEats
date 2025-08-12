import { selectCart } from "../../features/home/restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { selectLatAndLng } from "../../features/home/homeSlice";
import haversineFormula from "./../../utils/haversineFormula";
import { Link } from "react-router";
import { selectIsRestaurantOpen, selectDeliveryRestaurantStatus } from "../../features/home/restaurantsSlice";
import DotBounceLoader from "../../utils/DotBounceLoader";
import { 
  selectDeliveryAddress, 
  selectPaymentMethod,
  selectFinalBilling,
  setItemsTotalCost,
  setGSTAndOtherCharges,
  setPayableAmount,
} from "../../features/delivery/deliverySlice";

const Billing = ({ heading = true, checkout = false, latDelivery, lngDelivery }) => {

  const {
    totalItemCost,
    GSTAndOtherCharges,
    payableAmount
  } = useSelector(selectFinalBilling);

  const cart = useSelector(selectCart);
  const isRestaurantOpen = useSelector(selectIsRestaurantOpen);
  const deliveryAddress = useSelector(selectDeliveryAddress);
  const paymentMethod = useSelector(selectPaymentMethod);

  const { lat: latCurrent, lng: lngCurrent } = useSelector(selectLatAndLng);
  const statusLoading = useSelector(selectDeliveryRestaurantStatus);

  const [restroDemographics, setRestroDemographics] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [GST, setGST] = useState(0);
  const [distance, setDistance] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(30);

  const [openInfo, setOpenInfo] = useState(false);
  const [openDeliveryInfo, setOpenDeliveryInfo] = useState(false);

  const packagingCharge = 35;
  const platformFee = 5;

  const [GSTAndOther, setGSTAndOther] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const cartItem = Object.values(cart);
    const [latRestro, lngRestro] =
      cartItem[0]?.restaurantData.metadata?.latLong.split(",") ||
      cartItem[0]?.restaurantData.latLong.split(",");

    setRestroDemographics([latRestro, lngRestro])

    // const distance = haversineFormula(
    //   latRestro,
    //   checkout ? latDelivery : latCurrent,
    //   lngRestro,
    //   checkout ? lngDelivery : lngCurrent,
    // ).toFixed(2);
    // setDistance(distance);
    // // dispatch(setDeliveryCharge(distance));

    // const deliveryFee = 10 + Math.max(0, Math.floor(distance - 1)) * 5;
    // setDeliveryFee(deliveryFee);

    const total = cartItem.reduce((acc, { item, quantity }) => {
      const defaultPrice = item?.price / 100 || item?.defaultPrice / 100 || 0;
      const finalPrice = item?.finalPrice / 100;
      let price = +(finalPrice || defaultPrice).toFixed(2);

      return acc + quantity * price;
    }, 0);

    setTotalAmount(total);
    dispatch(setItemsTotalCost(total));
  }, [cart]);

  useEffect(() => {
    const gstAmount = totalAmount * 0.05;
    setGST(gstAmount);

    const GSTAndOther = +(gstAmount + packagingCharge + platformFee).toFixed(2);
    setGSTAndOther(GSTAndOther);
    dispatch(setGSTAndOtherCharges(GSTAndOther));

    const grandTotalAmount = +( totalAmount + GSTAndOther ).toFixed(2);
    setGrandTotal(grandTotalAmount);
    dispatch(setPayableAmount({ mode: "initial", cost : grandTotalAmount }));
  }, [totalAmount]);

  const [couponsOpen, setCouponsOpen] = useState(false);
  const [coupon, setCoupon] = useState("");

  const handlerCouponClick = (e) => {
    e.stopPropagation();
    setCouponsOpen(!couponsOpen);
  };

  const containerClickHandler = () => {
    setCouponsOpen(false);
    setOpenInfo(false);
  };

  const checkoutClickHandler = (e) => {
    if (Object.keys(deliveryAddress).length === 0 || paymentMethod === "") {
      e.preventDefault();
    }
  }

  const proceedFurtherClickHandler = (e) => {
    if (!isRestaurantOpen || statusLoading) {
      e.preventDefault();
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="rounded-md md:basis-[39%] dark:bg-gray-300 bg-white p-2 md:p-5 md:self-start">
      <div
        onClick={containerClickHandler}
        className="h-full w-full flex flex-col gap-4"
      >
        {heading && <h2 className="font-sans text-xl font-semibold underline underline-offset-4">
          Bill Details
        </h2>}
        {checkout === false && (<>
          <div
            onClick={handlerCouponClick}
            id="coupon"
            className="flex items-center justify-between px-3 h-14 border-[1px] border-dashed cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <i className="ri-discount-percent-fill text-4xl font-extralight"></i>
              {coupon ? (
                <p className="font-bold text-gray-500 select-none">{coupon}</p>
              ) : (
                <p className="select-none">Apply Coupon</p>
              )}
            </div>
            <i
              className="fa-solid fa-caret-down  text-black transform transition-transform duration-200 ease-linear"
              style={{
                transform: couponsOpen && "rotate(-180deg)",
              }}
            ></i>
          </div>
          <div
            className={`-mt-3 bg-gray-200 ${couponsOpen ? "h-18" : "h-0"
              } transition-all duration-150 ease-linear flex items-center justify-center`}
          >
            <p className={`${couponsOpen ? "block" : "hidden"} text-sm text-gray-900 font-semibold break-words`}>We are working on coupons</p>
          </div>
        </>)}

        <div className="text-sm">
          <div className="flex justify-between py-1">
            <span className="text-gray-600 dark:text-gray-950">Item Total</span>
            <span className="text-gray-700 dark:text-black font-semibold">₹{totalAmount}</span>
          </div>
          {/* <div className="flex justify-between items-center py-1">
            <p className="text-gray-600 flex items-center gap-0.5">
              <span className="dark:text-gray-950">Delivery Fee</span>
              <span className="dark:text-gray-950">┃</span>
              <span className="dark:text-gray-950">{distance} kms</span>
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeliveryInfo(!openDeliveryInfo);
                }}
                className={`${openDeliveryInfo ? "ri-close-circle-fill" : "ri-information-2-line"
                  } cursor-pointer text-[16px] text-black ml-0.5 relative`}
                onMouseEnter={() => setOpenDeliveryInfo(true)}
                onMouseLeave={() => setOpenDeliveryInfo(false)}
              >

                <div
                  onClick={(e) => e.stopPropagation()}
                  id="delivery_dropdown"
                  className="absolute -top-[325%] -left-[130%] h-[4.2rem] w-48 rounded-md p-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] bg-white z-20"
                  style={{
                    display: openDeliveryInfo ? "block" : "none",
                  }}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative h-full"
                  >
                    <div className="font-sans">
                      <div className="flex items-center font-normal grow-0 justify-between text-xs text-gray-600">
                        <p className="text-black font-semibold">Delivery Fee</p>
                        <p className="font-semibold text-black">₹{deliveryFee}</p>
                      </div>
                      <p className="text-[12px] tracking-wide mt-1 text-gray-700">
                        Calculated based on distance: ₹10 base + ₹5/km after 1 km
                      </p>
                    </div>
                    <div className="absolute top-[115%] left-3.5 bottom-full h-0 w-0 border-t-8 border-t-white border-l-8 border-r-8 border-r-transparent border-l-transparent"></div>
                  </div>
                </div>
              </i>
            </p>
            <span className="text-gray-700 dark:text-black font-semibold">₹{deliveryFee}</span>
          </div> */}

          <div className="flex justify-between py-1 pt-1.5 border-t-[1px] mt-2 border-gray-400 border-dashed">
            <div className="flex gap-1 items-center">
              <span className="text-gray-600 dark:text-gray-950">GST & Other Charges</span>
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenInfo(!openInfo);
                }}
                className={`relative ${openInfo ? "ri-close-circle-fill" : "ri-information-2-line"
                  } cursor-pointer text-[16px]`}
                onMouseEnter={() => setOpenInfo(true)}
                onMouseLeave={() => setOpenInfo(false)}
              >

                <div
                  onClick={(e) => e.stopPropagation()}
                  id="dropdown"
                  className="absolute -top-[760%] -left-[130%] h-[10.5rem] w-52 rounded-md p-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] bg-white z-10"
                  style={{
                    display: openInfo ? "block" : "none",
                  }}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative h-full"
                  >
                    <div className="font-sans">
                      <p className="break-words text-xs font-semibold text-black">
                        GST & Other Charges
                      </p>
                      <div className="flex items-center font-medium justify-between text-xs text-black mt-2">
                        <p>Restaurant Packaging</p>
                        <p className="font-semibold">₹{packagingCharge}</p>
                      </div>
                      <div className="flex items-center font-medium justify-between text-xs text-black mt-1.5">
                        <p>GST(5%)</p>
                        <p className="font-semibold">₹{+GST.toFixed(2)}</p>
                      </div>
                      <p className="text-[12px] font-sans leading-4 mt-0.5 text-gray-700" >
                        A government tax calculated as 5% of the total item cost.
                      </p>
                      <div className="flex items-center font-medium justify-between text-xs text-black mt-1.5">
                        <p>Platform Fee</p>
                        <p className="font-semibold">₹{platformFee}</p>
                      </div>
                      <p className="text-[12px] font-sans leading-4 mt-0.5 text-gray-700">
                        A fixed service charge to support app maintenance and
                        operations.
                      </p>
                    </div>

                    <div className="absolute top-[104%] left-3.5 bottom-full h-0 w-0 border-t-10 border-t-white border-l-8 border-r-8 border-r-transparent border-l-transparent"></div>
                  </div>
                </div>
              </i>
            </div>
            <span className="text-gray-700 dark:text-black font-semibold">₹{GSTAndOther}</span>
          </div>
          <div className="flex justify-between py-2 border-t mt-2 pt-2">
            <span className="text-black font-bold">Total Amount</span>
            <span className="text-black font-bold">₹{grandTotal}</span>
          </div>
        </div>
        {!checkout ? (
          <Link
            to={`/paymentsAndAddresses?restroDemographics=${restroDemographics}`}
            onClick={proceedFurtherClickHandler}
            className={`${isRestaurantOpen ? "bg-green-400 text-white" : "bg-gray-400 text-gray-700 border border-gray-700"} h-9 rounded flex items-center justify-center font-sans font-medium tracking-wide cursor-pointer text-center ${isRestaurantOpen && "active:scale-95"} transform transition-all duration-150`} >
            {statusLoading ? <DotBounceLoader /> : isRestaurantOpen ? "Proceed Further" : "Restaurant is closed"}
          </Link>
        )
          : (
            <>
              {(Object.keys(deliveryAddress).length === 0 || paymentMethod === "") 
              && <p className="text-red-500 text-sm">Please complete your delivery and payment details to proceed.</p> }
              <Link onClick={checkoutClickHandler} className={`${(Object.keys(deliveryAddress).length === 0 || paymentMethod === "")  ? "bg-gray-400 text-gray-700 border border-gray-700" : "bg-green-400 text-white"} py-1.5 lg:py-1 rounded  font-sans font-medium tracking-wide cursor-pointer text-center ${!(Object.keys(deliveryAddress).length === 0 || paymentMethod === "")  && "active:scale-95"} transform transition-all duration-150`}>Place Order</Link>
            </>
          )
        }
      </div>
    </section>
  );
};

// to={"/checkout"}

export default Billing;
