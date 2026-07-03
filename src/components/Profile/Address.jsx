import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'country-state-city';
import { selectDeviceFingerPrint } from '../../features/home/homeSlice';
import DotBounceLoader from './../../utils/DotBounceLoader';
import { Asterisk } from 'lucide-react';
import { toast } from 'react-toastify';
import UserAddress from './UserAddress';
import {
  selectSavedAddress,
  selectAddressLoading,
  setAddressLoading,
  setSavedAddress,
} from '../../features/delivery/deliverySlice';

const Address = (data) => {
  console.log('Profile/Address rendered');
  const dispatch = useDispatch();
  const deviceId = useSelector(selectDeviceFingerPrint);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [openDropDown, setOpenDropDown] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');

  const [countryStates, setCountryStates] = useState([]);
  const [searchedSates, setSearchedStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [stateDropDown, setStateDropDown] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const savedAddresses = useSelector(selectSavedAddress);
  const addressLoading = useSelector(selectAddressLoading);

  const formRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    dispatch(setSavedAddress(data.data.data));
  }, [data.data.data, dispatch]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flag')
      .then((res) => res.json())
      .then((data) => setAllCountries(data))
      .catch((err) => {
        console.log('Failed to fetch countries data', err);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry.length !== 0) {
      setOpenDropDown(true);
    } else {
      setOpenDropDown(false);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState.length !== 0) {
      setStateDropDown(true);
    } else {
      setStateDropDown(false);
    }
  }, [selectedState]);

  useEffect(() => {
    const states = State.getStatesOfCountry(selectedCountryCode);

    setCountryStates(states);
  }, [selectedCountryCode]);

  const countryChangeHandler = (e) => {
    setSelectedCountry(e.target.value);

    const searchedData = allCountries.filter((data) =>
      data.name.common.toLowerCase().startsWith(e.target.value.toLowerCase()),
    );
    setSearchedCountries(searchedData);

    const className = e.target.value.trim().toLowerCase();

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const selectedCountry = allCountries.find(
        (data) => data.name.common.toLowerCase() === className,
      );
      if (selectedCountry) {
        setSelectedCountryCode(selectedCountry.cca2);
      }
    }, 400);
  };

  const countryClickHandler = (e, code) => {
    e.stopPropagation();

    const country = e.target.innerText;
    setSelectedCountry(country);
    setSelectedCountryCode(code);

    setTimeout(() => setOpenDropDown(false), 100);
  };

  const stateChangeHandler = (e) => {
    setSelectedState(e.target.value);

    const result = countryStates.filter((data) =>
      data.name.toLowerCase().startsWith(e.target.value.toLowerCase()),
    );
    setSearchedStates(result);
  };

  const stateClickHandler = (e, value) => {
    e.stopPropagation();
    setSelectedState(value);

    setTimeout(() => setStateDropDown(false), 100);
  };

  const outSideClickHandler = () => {
    if (openDropDown) setOpenDropDown(false);
    if (stateDropDown) setStateDropDown(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSaveLoading(true);

    const data = new FormData(formRef.current);
    let obj = {};

    data.forEach((value, key) => {
      obj[key] = value;
    });

    try {
      const result = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/userActivity/userAddress`,
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
            address: obj,
          }),
          credentials: 'include',
        },
      );

      const response = await result.json();

      if (!result.ok) throw new Error(response.message);

      setSaveLoading(false);
      setShowForm(false);

      // toast.info(response.message)
      console.log(response);

      dispatch(setAddressLoading(true));

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/userActivity/userAddress`,
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

      const addresses = await res.json();
      if (!res.ok) throw new Error(addresses.message);

      dispatch(setAddressLoading(false));
      console.log('new address', addresses);
      dispatch(setSavedAddress(addresses.data));
    } catch (err) {
      console.log('Error in adding/getting address', err);
      setSaveLoading(false);
      dispatch(setAddressLoading(false));
      toast.error(err.message);
    }
  };

  return (
    <>
      <section onClick={outSideClickHandler} className="mt-4 w-full px-1">
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary dark:bg-darkPrimary mx-auto block rounded-md px-3 py-1 font-medium text-white"
          >
            Add Address
          </button>
        )}

        {showForm && (
          <div className="pb-2">
            <form
              onSubmit={submitHandler}
              onClick={outSideClickHandler}
              ref={formRef}
              className="border-primary w-[95%] rounded-xl border-[1px] p-4 max-lg:mx-auto lg:w-[70%] lg:p-5 dark:border-2"
            >
              <p className="relative text-sm text-black dark:text-white">
                Country
                <Asterisk
                  size={14}
                  className="absolute -top-0.5 inline text-red-600"
                />
              </p>

              <div className="group border-primary relative inline-flex w-full items-center gap-1 rounded border bg-gray-100 px-1 py-0.5 dark:bg-gray-300 dark:placeholder:text-gray-600">
                <input
                  type="text"
                  required={true}
                  name="country"
                  placeholder="Select your country"
                  className="inline w-full truncate border-none outline-none"
                  value={selectedCountry}
                  onChange={countryChangeHandler}
                ></input>
                <input
                  type="text"
                  name="countryCode"
                  defaultValue={selectedCountryCode}
                  hidden
                />
                <div
                  className={`absolute top-[110%] ${openDropDown ? 'max-h-70' : 'h-0'} left-0 z-10 w-full overflow-auto rounded-b-md bg-gray-100 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-all duration-150 ease-linear dark:bg-gray-300`}
                >
                  {searchedCountries.map((country, index) => (
                    <p
                      onClick={(e) => countryClickHandler(e, country.cca2)}
                      key={index}
                      className="rounded p-0.5 px-1 leading-5 hover:bg-blue-600 active:bg-blue-500 active:text-white"
                    >
                      {country.name.common}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <p className="relative text-sm text-black dark:text-white">
                  Full Name
                  <Asterisk
                    size={14}
                    className="absolute -top-0.5 inline text-red-600"
                  />
                </p>
                <input
                  type="text"
                  name="name"
                  required={true}
                  placeholder="Your full name"
                  className="border-primary w-full truncate rounded border bg-gray-100 p-0.5 px-1 outline-none dark:bg-gray-300 dark:placeholder:text-gray-600"
                />
              </div>

              <div className="mt-3">
                <p className="relative text-sm text-black dark:text-white">
                  Phone number
                  <Asterisk
                    size={14}
                    className="absolute -top-0.5 inline text-red-600"
                  />
                </p>
                <input
                  type="tel"
                  name="phone"
                  required={true}
                  placeholder="10-digit mobile number"
                  className="border-primary w-full truncate rounded border bg-gray-100 p-0.5 px-1 outline-none dark:bg-gray-300 dark:placeholder:text-gray-600"
                />
              </div>

              <div className="mt-3">
                <p className="relative text-sm text-black dark:text-white">
                  Flat no. / House no. / Building / Company / City
                  <Asterisk
                    size={14}
                    className="absolute -top-0.5 inline text-red-600"
                  />
                </p>
                <input
                  type="text"
                  name="flatNumber"
                  required={true}
                  placeholder="Enter flat, house number, building, or company"
                  className="border-primary w-full truncate rounded border bg-gray-100 p-0.5 px-1 outline-none dark:bg-gray-300 dark:placeholder:text-gray-600"
                />
              </div>

              <div className="mt-3">
                <p className="text-sm text-black dark:text-white">
                  Landmark
                  {/* <Asterisk size={14} className="absolute -top-0.5 text-red-600 inline" /> */}
                </p>
                <input
                  type="text"
                  name="landmark"
                  placeholder="Nearby landmark"
                  className="border-primary w-full truncate rounded border bg-gray-100 p-0.5 px-1 outline-none dark:bg-gray-300 dark:placeholder:text-gray-600"
                />
              </div>

              <div className="mt-3">
                <p className="relative text-sm text-black dark:text-white">
                  Pin Code
                  <Asterisk
                    size={14}
                    className="absolute -top-0.5 inline text-red-600"
                  />
                </p>
                <input
                  type="number"
                  name="pinCode"
                  required={true}
                  placeholder="Area pin code"
                  className="border-primary w-full truncate rounded border bg-gray-100 p-0.5 px-1 outline-none dark:bg-gray-300 dark:placeholder:text-gray-600"
                />
              </div>

              <div className="relative mt-3">
                <p className="relative text-sm text-black dark:text-white">
                  State
                  <Asterisk
                    size={14}
                    className="absolute -top-0.5 inline text-red-600"
                  />
                </p>
                <input
                  type="text"
                  value={selectedState}
                  required={true}
                  onChange={stateChangeHandler}
                  name="state"
                  placeholder="Select your state"
                  className="border-primary w-full truncate rounded border bg-gray-100 p-0.5 px-1 outline-none dark:bg-gray-300 dark:placeholder:text-gray-600"
                />

                <div
                  className={`absolute top-[105%] ${stateDropDown ? 'max-h-40' : 'h-0'} left-0 w-full overflow-auto rounded-b-md bg-gray-100 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-all duration-150 ease-linear dark:bg-gray-300`}
                >
                  {searchedSates.map((state, index) => (
                    <p
                      onClick={(e) => stateClickHandler(e, state.name)}
                      key={index}
                      className="rounded p-0.5 px-1 leading-5 hover:bg-blue-600 active:bg-blue-500 active:text-white"
                    >
                      {state.name}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="bg-primary dark:bg-darkPrimary mx-auto flex h-8 w-44 items-center justify-center rounded-md font-medium text-white transition-all duration-75 ease-linear active:scale-95"
                >
                  {saveLoading ? <DotBounceLoader /> : 'Save'}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-primary dark:bg-darkPrimary mx-auto flex h-8 w-44 items-center justify-center rounded-md font-medium text-white transition-all duration-75 ease-linear active:scale-95"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
      <section className="mt-3">
        <div className="flex w-full flex-col gap-3 overflow-x-hidden rounded-2xl">
          <div className="bg-primary dark:bg-darkPrimary flex w-full items-center justify-between px-2 py-2">
            <h2 className="text-lg text-white">SAVED ADDRESS</h2>
            {addressLoading && (
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-black bg-transparent"></div>
            )}
          </div>
          {savedAddresses.length !== 0 ? (
            savedAddresses.map((address) => (
              <UserAddress key={address.id} address={address} />
            ))
          ) : (
            <p className="text-center font-semibold tracking-wide text-black dark:text-gray-200">
              No Saved Address
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Address;
