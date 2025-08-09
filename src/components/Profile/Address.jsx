import { useState, useRef, useEffect } from "react";
import { State } from "country-state-city";

const Address = (data) => {
    // console.log(data);
    const [searchedCountries, setSearchedCountries] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [openDropDown, setOpenDropDown] = useState(false);

    const [selectedCountryCode, setSelectedCountryCode] = useState("");

    const [countryStates, setCountryStates] = useState([]);
    const [searchedSates, setSearchedStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [stateDropDown, setStateDropDown] = useState(false);

    const [showForm, setShowForm] = useState(false);

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

        // console.log("States", countryStates)

        const result = countryStates.filter(data => data.name.toLowerCase().startsWith(e.target.value.toLowerCase()));
        // console.log("Result", result)
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

    // console.log(searchedSates)

    return (
        <section onClick={outSideClickHandler} className="px-1 mt-4 w-full h-full">
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
                        onClick={outSideClickHandler}
                        ref={formRef}
                        className="p-4 lg:p-5 border-[1px] dark:border-2 border-primary w-[95%] lg:w-[70%] max-lg:mx-auto rounded-xl"
                    >
                        <p className="text-sm dark:text-white text-black">Country</p>

                        <div className="relative group border bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300 border-primary rounded py-0.5 px-1 w-full inline-flex items-center gap-1">
                            <input
                                type="text"
                                placeholder="Enter country"
                                className="inline w-full border-none outline-none truncate"
                                value={selectedCountry}
                                onChange={countryChangeHandler}
                            ></input>

                            <div
                                className={`absolute top-[110%] ${(openDropDown) ? "max-h-70" : "h-0"} drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-all duration-150 ease-linear overflow-auto bg-gray-100 dark:bg-gray-300 left-0 w-full rounded-b-md`}
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
                            <p className="text-sm dark:text-white text-black">Full Name</p>
                            <input type="text" name="name" placeholder="Enter your name" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                        </div>

                        <div className="mt-3">
                            <p className="text-sm dark:text-white text-black">Phone number</p>
                            <input type="tel" name="phone" placeholder="Enter your phone number" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                        </div>

                        <div className="mt-3">
                            <p className="text-sm dark:text-white text-black">Flat no. / House no. / Building / Company</p>
                            <input type="text" name="flatNumber" placeholder="Enter flat, house number, building, or company" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                        </div>

                        <div className="mt-3">
                            <p className="text-sm dark:text-white text-black">Landmark</p>
                            <input type="text" name="landmark" placeholder="Enter your landmark" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                        </div>

                        <div className="mt-3">
                            <p className="text-sm dark:text-white text-black">Pin Code</p>
                            <input type="number" name="pinCode" placeholder="Enter your pin code" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                        </div>

                        <div className="mt-3 relative">
                            <p className="text-sm dark:text-white text-black">State</p>
                            <input type="text" value={selectedState} onChange={stateChangeHandler} name="state" placeholder="Enter your state" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />

                            <div
                                className={`absolute top-[100%] ${(stateDropDown) ? "max-h-40" : "h-0"} drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-all duration-150 ease-linear overflow-auto bg-gray-100 dark:bg-gray-300 left-0 w-full rounded-b-md`}
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

                    </form>

                    <button className=" mt-5 active:scale-95 transition-all duration-75 ease-linear bg-primary mx-auto w-44 h-8 dark:bg-darkPrimary block rounded-md font-medium text-white">
                        Save
                    </button>

                </div>
            )}
        </section>
    );
};

export default Address;
