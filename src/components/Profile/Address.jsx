import { useState, useRef, useEffect } from "react";

const Address = (data) => {
    // console.log(data);
    const [searchedCountries, setSearchedCountries] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [openDropDown, setOpenDropDown] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flag")
            .then((res) => res.json())
            .then((data) => setAllCountries(data))
            .catch((err) => {
                console.log("Failed to fetch countries data", err);
            });
    }, []);

    const countrySelectHandler = (e) => {
        setSelectedCountry(e.target.value);

        const searchedData = allCountries.filter((data) =>
            data.name.common.toLowerCase().startsWith(selectedCountry.toLowerCase())
        );
        setSearchedCountries(searchedData);
    };



    const countryClickHandler = (e) => {
        e.stopPropagation();
        const country = e.target.innerText;
        setSelectedCountry(country);

        setTimeout(() => setOpenDropDown(false), 100)
    };

    let mapOnData = [];

    if (selectedCountry.length !== 0) {
        mapOnData = searchedCountries;
    } else {
        mapOnData = allCountries;
    }

    useEffect(() => {
        if (selectedCountry.length !== 0) {
            setOpenDropDown(true);
        } else {
            setOpenDropDown(false);
        }
    }, [selectedCountry])

    return (
        <section onClick={() => setOpenDropDown(false)} className="px-1 mt-4 w-full h-full">
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
                        onClick={() => setOpenDropDown(false)}
                        ref={formRef}
                        className="p-4 lg:p-5 border-[1px] dark:border-2 border-primary w-[95%] lg:w-[70%] max-lg:mx-auto rounded-xl"
                    >
                        <p className="text-sm dark:text-white text-black">Country</p>

                        <div className="relative group border bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300 border-primary rounded py-0.5 px-1 w-full inline-flex items-center gap-1">
                            <input
                                type="text"
                                placeholder="select country"
                                className="inline w-full border-none outline-none truncate"
                                value={selectedCountry}
                                onChange={countrySelectHandler}
                            ></input>

                            <div
                                onBlur={() => setOpenDropDown(false)}
                                className={`absolute top-[110%] ${(openDropDown) ? "max-h-0" : "h-0"} drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] transition-all duration-150 ease-linear overflow-auto bg-gray-100 dark:bg-gray-300 left-0 w-full rounded-b-md`}
                            >
                                {mapOnData.map((country, index) => (
                                    <p
                                        onClick={countryClickHandler}
                                        key={index}
                                        className="p-0.5 px-1 rounded leading-5 hover:bg-blue-600 active:bg-blue-500 active:text-white"
                                    >
                                        {country.name.common}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="mt-2">
                            <p className="text-sm dark:text-white text-black">Full Name</p>
                            <input type="text" name="name" placeholder="Enter your name" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                        </div>

                        <div className="mt-2">
                            <p className="text-sm dark:text-white text-black">Phone number</p>
                            <input type="tel" name="phone" placeholder="Enter your phone number" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                        </div>

                        <div className="mt-2">
                            <p className="text-sm dark:text-white text-black">Flat no./ House no./ Building / Company</p>
                            <input type="text" name="flatNumber" placeholder="Enter flat, house number, building, or company" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                        </div>

                        <div className="mt-2">
                            <p className="text-sm dark:text-white text-black">Landmark</p>
                            <input type="text" name="flatNumber" placeholder="Enter your landmark" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                        </div>

                        <div className="mt-2">
                            <p className="text-sm dark:text-white text-black">Pin Code</p>
                            <input type="number" name="flatNumber" placeholder="Enter your pin code" className="p-0.5 px-1 truncate border border-primary rounded w-full outline-none bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300" />
                        </div>
                    </form>
                    <button className=" mt-5 bg-primary mx-auto w-44 h-7 dark:bg-darkPrimary block rounded-md font-medium text-white">
                        Save
                    </button>
                </div>
            )}
        </section>
    );
};

export default Address;
