import { selectCart } from '../../features/home/restaurantsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  selectIsRestaurantOpen,
  selectDeliveryRestaurantStatus,
} from '../../features/home/restaurantsSlice';
import DotBounceLoader from '../../utils/DotBounceLoader';
import {
  selectDeliveryAddress,
  selectPaymentMethod,
  selectFinalBilling,
  setItemsTotalCost,
  setGSTAndOtherCharges,
  setPayableAmount,
} from '../../features/delivery/deliverySlice';

import calBilling from '../../utils/calBilling';

const Billing = ({
  heading = true,
  checkout = false,
  latDelivery,
  lngDelivery,
}) => {
  const { totalItemCost, GSTAndOtherCharges, payableAmount } =
    useSelector(selectFinalBilling);

  const cart = useSelector(selectCart);
  const isRestaurantOpen = useSelector(selectIsRestaurantOpen);
  const deliveryAddress = useSelector(selectDeliveryAddress);
  const paymentMethod = useSelector(selectPaymentMethod);

  const statusLoading = useSelector(selectDeliveryRestaurantStatus);

  const [restroDemographics, setRestroDemographics] = useState([]);
  const [GST, setGST] = useState(0);

  const [openInfo, setOpenInfo] = useState(false);

  const packagingCharge = 35;
  const platformFee = 5;

  const dispatch = useDispatch();

  useEffect(() => {
    const cartItems = Object.values(cart);
    const [latRestro, lngRestro] =
      cartItems[0]?.restaurantData.metadata?.latLong.split(',') ||
      cartItems[0]?.restaurantData.latLong.split(',');

    setRestroDemographics([latRestro, lngRestro]);

    const gst = calBilling({
      dispatch,
      cartItems,
      setItemsTotalCost,
      setGSTAndOtherCharges,
      setPayableAmount,
    });
    setGST(gst);
  }, [cart]);

  const [couponsOpen, setCouponsOpen] = useState(false);
  const [coupon, setCoupon] = useState('');

  const handlerCouponClick = (e) => {
    e.stopPropagation();
    setCouponsOpen(!couponsOpen);
  };

  const containerClickHandler = () => {
    setCouponsOpen(false);
    setOpenInfo(false);
  };

  const checkoutClickHandler = (e) => {
    if (Object.keys(deliveryAddress).length === 0 || paymentMethod === '') {
      e.preventDefault();
    }
  };

  const proceedFurtherClickHandler = (e) => {
    if (!isRestaurantOpen || statusLoading) {
      e.preventDefault();
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="rounded-md bg-white p-2 md:basis-[39%] md:self-start md:p-5 dark:bg-gray-300">
      <div
        onClick={containerClickHandler}
        className="flex h-full w-full flex-col gap-4"
      >
        {heading && (
          <h2 className="font-sans text-xl font-semibold underline underline-offset-4">
            Bill Details
          </h2>
        )}
        {checkout === false && (
          <>
            <div
              onClick={handlerCouponClick}
              id="coupon"
              className="flex h-14 cursor-pointer items-center justify-between border-[1px] border-dashed px-3"
            >
              <div className="flex items-center gap-3">
                <i className="ri-discount-percent-fill text-4xl font-extralight"></i>
                {coupon ? (
                  <p className="font-bold text-gray-500 select-none">
                    {coupon}
                  </p>
                ) : (
                  <p className="select-none">Apply Coupon</p>
                )}
              </div>
              <i
                className="fa-solid fa-caret-down transform text-black transition-transform duration-200 ease-linear"
                style={{
                  transform: couponsOpen && 'rotate(-180deg)',
                }}
              ></i>
            </div>
            <div
              className={`-mt-3 bg-gray-200 ${
                couponsOpen ? 'h-18' : 'h-0'
              } flex items-center justify-center transition-all duration-150 ease-linear`}
            >
              <p
                className={`${couponsOpen ? 'block' : 'hidden'} text-sm font-semibold break-words text-gray-900`}
              >
                We are working on coupons
              </p>
            </div>
          </>
        )}

        <div className="text-sm">
          <div className="flex justify-between py-1">
            <span className="text-gray-600 dark:text-gray-950">Item Total</span>
            <span className="font-semibold text-gray-700 dark:text-black">
              ₹{totalItemCost}
            </span>
          </div>

          <div className="mt-2 flex justify-between border-t-[1px] border-dashed border-gray-400 py-1 pt-1.5">
            <div className="flex items-center gap-1">
              <span className="text-gray-600 dark:text-gray-950">
                GST & Other Charges
              </span>
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenInfo(!openInfo);
                }}
                className={`relative ${
                  openInfo ? 'ri-close-circle-fill' : 'ri-information-2-line'
                } cursor-pointer text-[16px]`}
                onMouseEnter={() => setOpenInfo(true)}
                onMouseLeave={() => setOpenInfo(false)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  id="dropdown"
                  className="absolute -top-[760%] -left-[130%] z-10 h-[10.5rem] w-52 rounded-md bg-white p-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]"
                  style={{
                    display: openInfo ? 'block' : 'none',
                  }}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative h-full"
                  >
                    <div className="font-sans">
                      <p className="text-xs font-semibold break-words text-black">
                        GST & Other Charges
                      </p>
                      <div className="mt-2 flex items-center justify-between text-xs font-medium text-black">
                        <p>Restaurant Packaging</p>
                        <p className="font-semibold">₹{packagingCharge}</p>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-xs font-medium text-black">
                        <p>GST(5%)</p>
                        <p className="font-semibold">₹{+GST.toFixed(2)}</p>
                      </div>
                      <p className="mt-0.5 font-sans text-[12px] leading-4 text-gray-700">
                        A government tax calculated as 5% of the total item
                        cost.
                      </p>
                      <div className="mt-1.5 flex items-center justify-between text-xs font-medium text-black">
                        <p>Platform Fee</p>
                        <p className="font-semibold">₹{platformFee}</p>
                      </div>
                      <p className="mt-0.5 font-sans text-[12px] leading-4 text-gray-700">
                        A fixed service charge to support app maintenance and
                        operations.
                      </p>
                    </div>

                    <div className="absolute top-[104%] bottom-full left-3.5 h-0 w-0 border-t-10 border-r-8 border-l-8 border-t-white border-r-transparent border-l-transparent"></div>
                  </div>
                </div>
              </i>
            </div>
            <span className="font-semibold text-gray-700 dark:text-black">
              ₹{GSTAndOtherCharges}
            </span>
          </div>
          <div className="mt-2 flex justify-between border-t py-2 pt-2">
            <span className="font-bold text-black">Total Amount</span>
            <span className="font-bold text-black">₹{payableAmount}</span>
          </div>
        </div>
        {!checkout ? (
          <Link
            to={`/paymentsAndAddresses?restroDemographics=${restroDemographics}`}
            onClick={proceedFurtherClickHandler}
            className={`${isRestaurantOpen ? 'bg-green-400 text-white' : 'border border-gray-700 bg-gray-400 text-gray-700'} flex h-9 cursor-pointer items-center justify-center rounded text-center font-sans font-medium tracking-wide ${isRestaurantOpen && 'active:scale-95'} transform transition-all duration-150`}
          >
            {statusLoading ? (
              <DotBounceLoader />
            ) : isRestaurantOpen ? (
              'Proceed Further'
            ) : (
              'Restaurant is closed'
            )}
          </Link>
        ) : (
          <>
            {(Object.keys(deliveryAddress).length === 0 ||
              paymentMethod === '') && (
              <p className="text-sm text-red-500">
                Please complete your delivery and payment details to proceed.
              </p>
            )}
            <Link
              onClick={checkoutClickHandler}
              className={`${Object.keys(deliveryAddress).length === 0 || paymentMethod === '' ? 'border border-gray-700 bg-gray-400 text-gray-700' : 'bg-green-400 text-white'} cursor-pointer rounded py-1.5 text-center font-sans font-medium tracking-wide lg:py-1 ${!(Object.keys(deliveryAddress).length === 0 || paymentMethod === '') && 'active:scale-95'} transform transition-all duration-150`}
            >
              Place Order
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

// to={"/checkout"}

export default Billing;
