import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import MobileFooterMenu from '../Footer/MobileFooterMenu';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyGetAddressQuery } from '../../features/profile/profileApiSlice';
import AddressEditForm from '../Profile/AddressEditForm';
import CurrentLocation from './CurrentLocation';

import {
  setSavedAddress,
  selectSavedAddress,
  selectAddressLoading,
  selectEditAddressModal,
  setEditAddressModal,
  setHideEditAddressModal,
  selectAddAddressModal,
  setAddAddressModal,
  setPaymentMethod,
  selectPaymentMethod,
  selectDeliveryLat,
  selectDeliveryLng,
  selectIsDeliverable,
  selectFinalBilling,
} from '../../features/delivery/deliverySlice';

import { selectDeviceFingerPrint } from '../../features/home/homeSlice';
import UserAddress from '../Profile/UserAddress';
import FinalBilling from './FinalBilling';

const PaymentsAndAddress = () => {
  const shimmerArray = Array.from({ length: 2 });
  const editAddressModal = useSelector(selectEditAddressModal);

  const {
    totalItemCost,
    deliveryCharge,
    deliveryKilometers,
    GSTAndOtherCharges,
    payableAmount,
  } = useSelector(selectFinalBilling);

  // console.log("TotalItemCost", totalItemCost, "DeliverChager", deliveryCharge, "delikilome", deliveryKilometers, "gst and other", GSTAndOtherCharges, "NEt", payableAmount)

  const scrollRef = useRef(null);

  const [searchParams] = useSearchParams();
  const [latRestro, lngRestro] = searchParams
    .get('restroDemographics')
    .split(',');
  const addAddress = useSelector(selectAddAddressModal);
  const latDelivery = useSelector(selectDeliveryLat);
  const lngDelivery = useSelector(selectDeliveryLng);
  const isDeliverable = useSelector(selectIsDeliverable);

  const dispatch = useDispatch();
  const [addressLoading, setAddressLoading] = useState(true);
  const [overflowing, setOverflowing] = useState(false);
  const [showDirection, setShowDirection] = useState(false);

  const savedAddresses = useSelector(selectSavedAddress);
  const [triggerSavedAddress] = useLazyGetAddressQuery();
  const deviceId = useSelector(selectDeviceFingerPrint);
  const storeAddressLoading = useSelector(selectAddressLoading);
  const paymentMethod = useSelector(selectPaymentMethod);

  useEffect(() => {
    if (scrollRef.current) {
      const ele = scrollRef.current;
      const overflow = ele.scrollWidth > ele.clientWidth;

      setShowDirection(overflow);
    }
  }, [savedAddresses]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const address = await triggerSavedAddress({ deviceId }).unwrap();

        dispatch(setSavedAddress(address.data));
        setAddressLoading(false);
      } catch (err) {
        console.log('Error in fetching address', err);
        setAddressLoading(false);
      }
    };
    fetchAddress();
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      const htmlELe = document.documentElement;
      const clientHeight = htmlELe.clientHeight;
      const scrollHeight = htmlELe.scrollHeight;

      if (scrollHeight > clientHeight) {
        setOverflowing(true);
      } else {
        setOverflowing(false);
      }
    };

    checkOverflow();

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [document.documentElement.scrollHeight]);

  const handleScroll = (direction) => {
    const ele = scrollRef.current;

    if (direction === 'right') {
      ele.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    } else {
      ele.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main
      className={`min-h-[110%] w-full pt-20 lg:pt-28 ${!overflowing && 'h-full'} bg-gray-200 dark:bg-black`}
    >
      <div className="mx-auto flex w-full flex-col justify-between pb-20 max-md:gap-3 max-md:px-1.5 md:max-w-[1070px] md:flex-row md:px-3">
        <section className="flex flex-col gap-2 rounded bg-white p-2 md:basis-[59%] lg:p-4 dark:bg-gray-300">
          <h1
            className="text-center text-xl tracking-wider text-gray-800"
            aria-label="Page to set delivery address and payment method"
          >
            Delivery & Payment Setup
          </h1>
          <div className="mt-1 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
            <div className="bg-primary dark:bg-darkPrimary flex w-full items-center justify-between px-2 py-2">
              <h2 className="text-lg text-white">SAVED ADDRESS</h2>

              {(addressLoading || storeAddressLoading) && (
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-black bg-transparent"></div>
              )}

              {showDirection && !addressLoading && !storeAddressLoading && (
                <div className="flex gap-0.5 text-2xl text-white">
                  <i
                    onClick={() => handleScroll('left')}
                    className="ri-arrow-left-double-line cursor-pointer"
                  ></i>
                  <i
                    onClick={() => handleScroll('right')}
                    className="ri-arrow-right-double-line cursor-pointer"
                  ></i>
                </div>
              )}
            </div>
            <div
              ref={scrollRef}
              className="hide-scrollbar flex h-full w-full flex-nowrap gap-3 overflow-auto p-2"
            >
              {addressLoading || storeAddressLoading
                ? shimmerArray.map((_, i) => (
                    <div
                      key={i}
                      className="flex w-[85%] shrink-0 flex-col items-center justify-center gap-2.5 rounded-xl border border-gray-400 p-2"
                    >
                      <div className="shimmerBg h-4 w-[100%] rounded"></div>
                      <div className="shimmerBg h-4 w-[100%] rounded"></div>
                      <div className="shimmerBg h-4 w-[100%] rounded"></div>
                      <div className="shimmerBg h-4 w-[100%] rounded"></div>
                      <div className="flex gap-2 self-start">
                        <div className="shimmerBg h-5 w-18 rounded"></div>
                        <div className="shimmerBg h-5 w-18 rounded"></div>
                      </div>
                    </div>
                  ))
                : savedAddresses.map((address) => (
                    <UserAddress
                      key={address._id}
                      width="w-[90%]"
                      address={address}
                      latRestro={latRestro}
                      lngRestro={lngRestro}
                    />
                  ))}
            </div>
          </div>

          {!isDeliverable && (
            <p className="text-center text-sm text-gray-600">
              No deliverable address found. Add a new one below.
            </p>
          )}

          <button
            onClick={() => {
              dispatch(setAddAddressModal(true));
              dispatch(setHideEditAddressModal(false));
              dispatch(setEditAddressModal(true));
            }}
            className="bg-primary dark:bg-darkPrimary mx-auto mt-2 block rounded-md px-3 py-1 font-medium text-white"
          >
            Add Address
          </button>
        </section>
        <section className="rounded-md bg-white p-2 md:basis-[39%] md:self-start md:p-5 dark:bg-gray-300">
          <CurrentLocation latRestro={latRestro} lngRestro={lngRestro} />

          <div className="mt-3">
            <h2 className="text-xl text-gray-800">Payment Method</h2>
            <div className="flex flex-col items-start px-2">
              <div className="flex w-full items-center gap-2 border-b-[1px] border-b-gray-950 py-2">
                <input
                  type="radio"
                  name="payment"
                  value={'COD'}
                  checked={paymentMethod === 'COD'}
                  onChange={() => dispatch(setPaymentMethod('COD'))}
                />
                <div>
                  <p className="font-medium">Cash on delivery</p>
                  <p className="text-sm text-gray-600">
                    A convenience fee ₹10 will apply.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 py-2">
                <input
                  type="radio"
                  name="payment"
                  value={'Online'}
                  checked={paymentMethod === 'Online'}
                  onChange={() => dispatch(setPaymentMethod('Online'))}
                />
                <div>
                  <p className="font-medium">Online</p>
                  <p className="text-sm text-gray-600">
                    Pay using UPI, Cards, Netbanking via Razorpay.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-2 overflow-hidden rounded">
            <div className="w-fully">
              <h2 className="text-xl text-gray-800">Final Billing</h2>
            </div>
            <FinalBilling />
          </section>
        </section>
      </div>
      <MobileFooterMenu />
      {editAddressModal && addAddress && (
        <div
          onClick={() => {
            dispatch(setHideEditAddressModal(true));
            dispatch(setAddAddressModal(false));
          }}
          className="fixed top-0 bottom-0 left-0 z-50 h-full w-full bg-black/60"
        >
          <AddressEditForm forWhat="Add" />
        </div>
      )}
    </main>
  );
};

export default PaymentsAndAddress;
