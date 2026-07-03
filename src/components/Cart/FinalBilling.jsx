import {
  selectFinalBilling,
  setGSTAndOtherCharges,
  setPayableAmount,
  setItemsTotalCost,
  selectDeliveryAddress,
  selectPaymentMethod,
  setDeliveryAddress,
  setPaymentMethod,
  setDeliveryCharge,
} from '../../features/delivery/deliverySlice';

import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectCart,
  setItemToCart,
} from '../../features/home/restaurantsSlice';
import calBilling from '../../utils/calBilling';
import {
  selectDeviceFingerPrint,
  selectUserDetails,
  selectCurrentTheme,
} from '../../features/home/homeSlice';
import DotBounceLoader from '../../utils/DotBounceLoader';
import Lottie from 'lottie-react';
import successAnimation from './../../assets/Success.json';
// import Razorpay from "razorpay";

const FinalBilling = () => {
  const {
    totalItemCost,
    deliveryCharge,
    deliveryKilometers,
    GSTAndOtherCharges,
    payableAmount,
  } = useSelector(selectFinalBilling);

  const { userName, userEmail, userPhone } = useSelector(selectUserDetails);
  const theme = useSelector(selectCurrentTheme);

  // console.log(deliveryCharge);

  const deliveryAddress = useSelector(selectDeliveryAddress);
  const paymentMethod = useSelector(selectPaymentMethod);
  const cart = useSelector(selectCart);
  const deviceId = useSelector(selectDeviceFingerPrint);
  const cartItems = Object.values(cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gst, setGst] = useState(0);
  const [openDeliveryInfo, setOpenDeliveryInfo] = useState(false);
  const [orderPlaceLoading, setOrderPlaceLoading] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [verifyPayment, setVerifyPayment] = useState(false);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const placeOrder = async (payment) => {
    const result = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/payments/order`,
      {
        method: 'POST',
        headers: {
          'x-identifier': import.meta.env.VITE_HASHED_IDENTIFIER,
          'Content-Type': 'application/json',
          'x-user-agent': navigator.userAgent,
          'x-language': navigator.language,
          'x-resolution': `${screen.height}x${screen.width}`,
          'x-device-id': deviceId,
        },
        body: JSON.stringify({
          items: cart,
          address: deliveryAddress,
          distance: deliveryKilometers,
          billing: {
            itemsTotal: totalItemCost,
            deliveryFee: deliveryCharge,
            GST: gst,
            packaging: 35,
            platformFee: 5,
            cashHandlingFee: 10,
            grandTotal: payableAmount,
          },

          payment,
          orderStatus: 'PLACED',
        }),
        credentials: 'include',
      },
    );

    return result;
  };

  const checkoutClickHandler = async () => {
    if (Object.keys(deliveryAddress).length === 0 || paymentMethod === '')
      return;
    if (orderPlaceLoading) return;

    setOrderPlaceLoading(true);

    if (paymentMethod === 'Online') {
      try {
        const res = await loadScript(
          'https://checkout.razorpay.com/v1/checkout.js',
        );

        if (!res) {
          alert('Razropay failed to load!!');
          return;
        }

        const result = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/payments/onlineOrder`,
          {
            method: 'POST',
            headers: {
              'x-identifier': import.meta.env.VITE_HASHED_IDENTIFIER,
              'Content-Type': 'application/json',
              'x-user-agent': navigator.userAgent,
              'x-language': navigator.language,
              'x-resolution': `${screen.height}x${screen.width}`,
              'x-device-id': deviceId,
            },

            body: JSON.stringify({
              amount: payableAmount,
            }),

            credentials: 'include',
          },
        );

        const response = await result.json();
        if (!result.ok) throw new Error(response.message);

        const { order } = response;

        const result2 = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/payments/key`,
          {
            method: 'GET',
            headers: {
              'x-identifier': import.meta.env.VITE_HASHED_IDENTIFIER,
              'Content-Type': 'application/json',
              'x-user-agent': navigator.userAgent,
              'x-language': navigator.language,
              'x-resolution': `${screen.height}x${screen.width}`,
              'x-device-id': deviceId,
            },
            credentials: 'include',
          },
        );

        const response2 = await result2.json();
        if (!result2.ok) throw new Error(response2.message);
        const { key } = response2;

        const options = {
          key,
          amount: order.amount,
          currency: 'INR',
          name: 'ZestyEats',
          description: 'Test Transaction',
          Image: '/images/LogoSquare.png',
          order_id: order.id,
          prefill: {
            name: userName,
            email: userEmail,
            contact: userPhone,
          },
          theme: {
            color: theme === 'dark' ? '#9f0712' : '#ff5200',
          },

          handler: async function (response) {
            try {
              setVerifyPayment(true);
              const result = await fetch(
                `${import.meta.env.VITE_BASE_URL}/api/payments/paymentVerification`,
                {
                  method: 'POST',
                  headers: {
                    'x-identifier': import.meta.env.VITE_HASHED_IDENTIFIER,
                    'Content-Type': 'application/json',
                    'x-user-agent': navigator.userAgent,
                    'x-language': navigator.language,
                    'x-resolution': `${screen.height}x${screen.width}`,
                    'x-device-id': deviceId,
                  },
                  body: JSON.stringify({
                    data: {
                      order_id: response.razorpay_order_id,
                      payment_id: response.razorpay_payment_id,
                      signature: response.razorpay_signature,
                    },
                  }),
                  credentials: 'include',
                },
              );

              const beResponse = await result.json();
              if (!result.ok) throw new Error(beResponse.message);

              const payment = {
                method: 'ONLINE',
                status: 'PENDING',
                transactionId: response.razorpay_payment_id,
                provider: 'Rayzorpay',
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              };
              const result2 = await placeOrder(payment);

              const order = await result2.json();
              if (!result.ok) throw new Error(order.message);

              setOrderPlaceLoading(false);
              setVerifyPayment(false);
              setOrderPlaced(true);

              // dispatch(setItemToCart({ mode: "initial", object: {} }));

              dispatch(setDeliveryAddress({}));
              dispatch(setPaymentMethod(''));
              dispatch(setDeliveryCharge(0));
              // reset these things on going back too
              // confirm payment from webhooks then mark payment success
            } catch (err) {
              console.log('Error in payment verification', err);
              setOrderPlaceLoading(false);
            }
          },
        };

        console.log('options', options);

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        console.log('Error in creating order', err);
        setOrderPlaceLoading(false);
      }
    } else if (paymentMethod === 'COD') {
      try {
        const payment = {
          method: 'COD',
          status: 'PENDING',
        };
        const result = await placeOrder(payment);

        const order = await result.json();
        if (!result.ok) throw new Error(order.message);

        setOrderPlaceLoading(false);
        setOrderPlaced(true);

        dispatch(setItemToCart({ mode: 'initial', object: {} }));
        dispatch(setDeliveryAddress({}));
        dispatch(setPaymentMethod(''));
        dispatch(setDeliveryCharge(0));
      } catch (err) {
        console.log('Error in placing order', err);
        setOrderPlaceLoading(false);
      }
    }
  };

  useEffect(() => {
    const gst = calBilling({
      dispatch,
      cartItems,
      setItemsTotalCost,
      setGSTAndOtherCharges,
      setPayableAmount,
    });

    setGst(gst);
  }, [cart, cartItems, dispatch]);

  useEffect(() => {
    function resizeHandler() {
      if (window.innerWidth <= 768) {
        setSmallScreen(true);
      } else {
        setSmallScreen(false);
      }
    }

    resizeHandler();

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <div className="rounded-md bg-white p-2 md:self-start dark:bg-gray-300">
      {orderPlaced && (
        <div className="fixed top-0 bottom-0 left-0 flex h-full w-full items-center justify-center bg-green-500 max-lg:z-[100]">
          <div>
            <Lottie
              animationData={successAnimation}
              loop={false}
              onComplete={() => {
                if (smallScreen)
                  navigate('/ordersAndWishlist', { replace: true });
                else navigate('/profile', { replace: true });
              }}
              style={{ width: 300, height: 300 }}
            />
            <p className="-mt-4 text-center text-4xl font-semibold text-white">
              Order Placed!
            </p>
          </div>
        </div>
      )}

      {verifyPayment && (
        <div className="fixed top-0 bottom-0 left-0 flex h-full w-full items-center justify-center bg-green-500 max-lg:z-[100]">
          <div>
            <div className="border-t-primary mx-auto h-24 w-24 animate-spin rounded-full border-8 border-white"></div>
            <p className="mt-4 text-center text-2xl font-semibold text-white">
              Confirming Payment
            </p>
          </div>
        </div>
      )}

      <div className="flex h-full w-full flex-col gap-4">
        <div className="text-sm">
          <div className="flex justify-between py-1">
            <span className="text-gray-600 dark:text-gray-950">Item Total</span>
            <span className="font-semibold text-gray-700 dark:text-black">
              ₹{totalItemCost}
            </span>
          </div>

          <div className="flex justify-between border-dashed py-1 pt-1.5">
            <span className="text-gray-600 dark:text-gray-950">
              GST & Other Charges
            </span>
            <span className="font-semibold text-gray-700 dark:text-black">
              ₹{GSTAndOtherCharges}
            </span>
          </div>

          {deliveryCharge !== 0 && deliveryKilometers !== 0 && (
            <div className="flex items-center justify-between py-1">
              <p className="flex items-center gap-0.5 text-gray-600">
                <span className="dark:text-gray-950">Delivery Fee</span>
                <span className="dark:text-gray-950">┃</span>
                <span className="dark:text-gray-950">
                  {deliveryKilometers} kms
                </span>
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDeliveryInfo(!openDeliveryInfo);
                  }}
                  className={`${
                    openDeliveryInfo
                      ? 'ri-close-circle-fill'
                      : 'ri-information-2-line'
                  } relative ml-0.5 cursor-pointer text-[16px] text-black`}
                  onMouseEnter={() => setOpenDeliveryInfo(true)}
                  onMouseLeave={() => setOpenDeliveryInfo(false)}
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    id="delivery_dropdown"
                    className="absolute -top-[325%] -left-[130%] z-20 h-[4.2rem] w-48 rounded-md bg-white p-2 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]"
                    style={{
                      display: openDeliveryInfo ? 'block' : 'none',
                    }}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="relative h-full"
                    >
                      <div className="font-sans">
                        <div className="flex grow-0 items-center justify-between text-xs font-normal text-gray-600">
                          <p className="font-semibold text-black">
                            Delivery Fee
                          </p>
                          <p className="font-semibold text-black">
                            ₹{deliveryCharge}
                          </p>
                        </div>
                        <p className="mt-1 text-[12px] tracking-wide text-gray-700">
                          Calculated based on distance: ₹10 base + ₹5/km after 1
                          km
                        </p>
                      </div>
                      <div className="absolute top-[115%] bottom-full left-3.5 h-0 w-0 border-t-8 border-r-8 border-l-8 border-t-white border-r-transparent border-l-transparent"></div>
                    </div>
                  </div>
                </i>
              </p>
              <span className="font-semibold text-gray-700 dark:text-black">
                ₹{deliveryCharge}
              </span>
            </div>
          )}

          {paymentMethod === 'COD' && (
            <div className="mt-1.5 flex justify-between border-t-[1px] border-dashed py-1 pt-1.5">
              <span className="text-gray-600 dark:text-gray-950">
                Payment Handling Charge
              </span>
              <span className="font-semibold text-gray-700 dark:text-black">
                + ₹10
              </span>
            </div>
          )}

          <div className="mt-2 flex justify-between border-t py-2 pt-2">
            <span className="font-bold text-black">Total Amount</span>
            <span className="font-bold text-black">₹{payableAmount}</span>
          </div>
        </div>
        <>
          {(Object.keys(deliveryAddress).length === 0 ||
            paymentMethod === '') && (
            <p className="text-sm text-red-500">
              Please complete your delivery and payment details to proceed.
            </p>
          )}
          <button
            onClick={checkoutClickHandler}
            className={`${Object.keys(deliveryAddress).length === 0 || paymentMethod === '' ? 'border border-gray-700 bg-gray-400 text-gray-700' : 'bg-green-400 text-white'} h-9 w-full cursor-pointer rounded text-center font-sans font-medium tracking-wide ${!(Object.keys(deliveryAddress).length === 0 || paymentMethod === '') && 'active:scale-95'} flex transform items-center justify-center transition-all duration-150`}
          >
            {orderPlaceLoading ? <DotBounceLoader /> : 'Place Order'}
          </button>
        </>
      </div>
    </div>
  );
};

export default FinalBilling;
