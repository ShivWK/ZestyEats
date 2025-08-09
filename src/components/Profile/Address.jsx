import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { State } from "country-state-city";
import { selectDeviceFingerPrint } from "../../features/home/homeSlice";
import DotBounceLoader from "./../../utils/DotBounceLoader";
import { Asterisk } from "lucide-react";
import { toast } from "react-toastify";
import UserAddress from "./UserAddress";

const Address = (data) => {
    console.log(data);

    const pathName = useLocation().pathname;
    const deviceId = useSelector(selectDeviceFingerPrint);
    const [searchedCountries, setSearchedCountries] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [openDropDown, setOpenDropDown] = useState(false);
    const [savedAddresses, setSavedAddresses] = useState(data.data.data)

    const [selectedCountryCode, setSelectedCountryCode] = useState("");

    const [countryStates, setCountryStates] = useState([]);
    const [searchedSates, setSearchedStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [stateDropDown, setStateDropDown] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    const formRef = useRef(null);
    const timer = useRef(null);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flag")
            .then((res) => res.json())
            .then((data) => setAllCountries(data))
            .catch((err) => {
                console.log("Failed to fetch countries data", err);
            });
    }, []);

    useEffect(() => {
        if (selectedCountry.length !== 0) {
            setOpenDropDown(true);
        } else {
            setOpenDropDown(false);
        }

    }, [selectedCountry])

    useEffect(() => {
        if (selectedState.length !== 0) {
            setStateDropDown(true);
        } else {
            setStateDropDown(false);
        }

    }, [selectedState])

    useEffect(() => {
        const states = State.getStatesOfCountry(selectedCountryCode);

        setCountryStates(states);
    }, [selectedCountryCode])

    const countryChangeHandler = (e) => {
        setSelectedCountry(e.target.value);

        const searchedData = allCountries.filter((data) =>
            data.name.common.toLowerCase().startsWith(e.target.value.toLowerCase())
        );
        setSearchedCountries(searchedData);

        const className = e.target.value.trim().toLowerCase();

        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            const selectedCountry = allCountries.find(data => data.name.common.toLowerCase() === className);
            if (selectedCountry) {
                setSelectedCountryCode(selectedCountry.cca2);
            }
        }, 400)
    };

    const countryClickHandler = (e, code) => {
        e.stopPropagation();

        const country = e.target.innerText;
        setSelectedCountry(country);
        setSelectedCountryCode(code)

        setTimeout(() => setOpenDropDown(false), 100)
    };

    const stateChangeHandler = (e) => {
        setSelectedState(e.target.value);

        const result = countryStates.filter(data => data.name.toLowerCase().startsWith(e.target.value.toLowerCase()));
        setSearchedStates(result);
    }

    const stateClickHandler = (e, value) => {
        e.stopPropagation();
        setSelectedState(value);

        setTimeout(() => setStateDropDown(false), 100)
    }

    const outSideClickHandler = () => {
        if (openDropDown) setOpenDropDown(false);
        if (stateDropDown) setStateDropDown(false);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setSaveLoading(true);

        const data = new FormData(formRef.current);
        let obj = {}

        data.forEach((value, key) => {
            obj[key] = value;
        })

        const searchString = `${obj.flatNumber}, ${obj.state}, ${obj.pinCode}, ${obj.country}.`;

        try {
            const latLong = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchString}`);

            const data = await latLong.json();
            console.log(data)

            const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/userActivity/userAddress`, {
                method: "POST",
                headers: {
                    "x-identifier": import.meta.env.VITE_HASHED_IDENTIFIER,
                    "Content-Type": "application/json",
                    "x-user-agent": navigator.userAgent,
                    "x-language": navigator.language,
                    "x-resolution": `${screen.height}x${screen.width}`,
                    "x-device-id": deviceId,
                },
                body: JSON.stringify({
                    address: obj
                }),
                credentials: "include",
            });

            const response = await result.json();

            if (!result.ok) throw new Error(response.message);

            setSaveLoading(false);
            setShowForm(false);

            toast.info(response.message)
            console.log(response);
        } catch (err) {
            console.log("Error in adding address", err);
            setSaveLoading(false)
            toast.error(err.message);
        }
    }

    return (
        <>
            <section onClick={outSideClickHandler} className="px-1 mt-4 w-full">
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-primary mx-auto dark:bg-darkPrimary px-3 py-1 rounded-md font-medium text-white block"
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
                            className="p-4 lg:p-5 border-[1px] dark:border-2 border-primary w-[95%] lg:w-[70%] max-lg:mx-auto rounded-xl"
                        >
                            <p className="relative text-sm dark:text-white text-black">
                                Country
                                <Asterisk size={14} className="absolute -top-0.5 text-red-600 inline" />
                            </p>

                            <div className="relative group border bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300 border-primary rounded py-0.5 px-1 w-full inline-flex items-center gap-1">
                                <input
                                    type="text"
                                    required={true}
                                    name="country"
                                    placeholder="Select your country"
                                    className="inline w-full border-none outline-none truncate"
                                    value={selectedCountry}
                                    onChange={countryChangeHandler}
                                ></input>

                                <div
                                    className={`absolute top-[110%] ${(openDropDown) ? "max-h-70" : "h-0"} drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-all duration-150 ease-linear overflow-auto bg-gray-100 dark:bg-gray-300 left-0 w-full rounded-b-md z-10`}
                                >
                                    {searchedCountries.map((country, index) => (
                                        <p
                                            onClick={(e) => countryClickHandler(e, country.cca2)}
                                            key={index}
                                            className="p-0.5 px-1 rounded leading-5 hover:bg-blue-600 active:bg-blue-500 active:text-white"
                                        >
                                            {country.name.common}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-3">
                                <p className="relative text-sm dark:text-white text-black">
                                    Full Name
                                    <Asterisk size={14} className="absolute -top-0.5 text-red-600 inline" />
                                </p>
                                <input type="text" name="name" required={true} placeholder="Your full name" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                            </div>

                            <div className="mt-3">
                                <p className="relative text-sm dark:text-white text-black">
                                    Phone number
                                    <Asterisk size={14} className="absolute -top-0.5 text-red-600 inline" />
                                </p>
                                <input type="tel" name="phone" required={true} placeholder="10-digit mobile number" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                            </div>

                            <div className="mt-3">
                                <p className="relative text-sm dark:text-white text-black">
                                    Flat no. / House no. / Building / Company / City
                                    <Asterisk size={14} className="absolute -top-0.5 text-red-600 inline" />
                                </p>
                                <input type="text" name="flatNumber" required={true} placeholder="Enter flat, house number, building, or company" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                            </div>

                            <div className="mt-3">
                                <p className="text-sm dark:text-white text-black">
                                    Landmark
                                    {/* <Asterisk size={14} className="absolute -top-0.5 text-red-600 inline" /> */}
                                </p>
                                <input type="text" name="landmark" placeholder="Nearby landmark" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                            </div>

                            <div className="mt-3">
                                <p className="relative text-sm dark:text-white text-black">
                                    Pin Code
                                    <Asterisk size={14} className="absolute -top-0.5 text-red-600 inline" />
                                </p>
                                <input type="number" name="pinCode" required={true} placeholder="Area pin code" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                            </div>

                            <div className="mt-3 relative">
                                <p className="relative text-sm dark:text-white text-black">
                                    State
                                    <Asterisk size={14} className="absolute -top-0.5 text-red-600 inline" />
                                </p>
                                <input type="text" value={selectedState} required={true} onChange={stateChangeHandler} name="state" placeholder="Select your state" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />

                                <div
                                    className={`absolute top-[105%] ${(stateDropDown) ? "max-h-40" : "h-0"} drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-all duration-150 ease-linear overflow-auto bg-gray-100 dark:bg-gray-300 left-0 w-full rounded-b-md`}
                                >
                                    {searchedSates.map((state, index) => (
                                        <p
                                            onClick={(e) => stateClickHandler(e, state.name)}
                                            key={index}
                                            className="p-0.5 px-1 rounded leading-5 hover:bg-blue-600 active:bg-blue-500 active:text-white"
                                        >
                                            {state.name}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-5 flex gap-2">
                                <button type="submit" disabled={saveLoading} className="active:scale-95 transition-all duration-75 ease-linear bg-primary mx-auto w-44 h-8 dark:bg-darkPrimary flex items-center justify-center rounded-md font-medium text-white">
                                    {saveLoading ? <DotBounceLoader /> : "Save"}
                                </button>

                                <button type="button" onClick={() => setShowForm(false)} className="active:scale-95 transition-all duration-75 ease-linear bg-primary mx-auto w-44 h-8 dark:bg-darkPrimary flex items-center justify-center rounded-md font-medium text-white">
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </section>
            <section className="mt-3">
                <div className="flex flex-col gap-3 w-full rounded-2xl overflow-x-hidden">
                    <div className="px-2 py-2 w-full bg-primary dark:bg-darkPrimary">
                        <h2 className="text-white text-lg">SAVED ADDRESS</h2>
                    </div>
                    {savedAddresses && savedAddresses.map(address => <UserAddress address={address} /> )}
                </div>

            </section>
        </>

    );
};

export default Address;
