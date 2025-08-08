import { useState, useRef, useEffect } from "react";

const Address = (data) => {
    // console.log(data);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("Select Country")
    const [openDropDown, setOpenDropDown] = useState(false)
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flag")
            .then(res => res.json())
            .then(data => setCountries(data))
            .catch(err => {
                console.log("Failed to fetch countries data", err);
            })

        console.log(countries.find(data => data.cca2 === "SH"))

    }, [])

    const countrySelectHandler = (e) => {
        setCountries(e.target.value);
    }

    return <section className="px-1 mt-4">
        {!showForm && (<button onClick={() => setShowForm(true)} className="bg-primary dark:bg-darkPrimary px-3 py-1 rounded-md font-medium text-white">
            Add Address
        </button>)}

        {showForm && <form
            ref={formRef}
            className="p-4 lg:p-5 border-[1px] dark:border-2 border-primary w-[95%] lg:w-[70%] max-lg:mx-auto rounded-xl"
        >
            <p className="text-sm dark:text-white text-black inline">Country:</p>
            {"  "}
            <div className="relative group border bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-300 border-primary rounded py-0.5 px-1 w-[80%] inline-flex items-center gap-1">
                <input type="text" placeholder="select country" className="inline w-full border-none outline-none" value={selectedCountry} onChange={countrySelectHandler}></input>
                <i
                    onClick={() => setOpenDropDown(!openDropDown)}
                    className="fa-solid fa-caret-down dark:group-hover:text-gray-800 text-gray-900 transition-all duration-300 linear"
                    style={{
                        transform: openDropDown ? "rotate(-180deg)" : "",
                    }}
                ></i>

                <div onBlur={() => setOpenDropDown(false)} className={`absolute top-[120%] ${openDropDown ? "h-80 p-1" : "h-0"} transition-all duration-150 ease-linear overflow-auto bg-gray-100 dark:bg-gray-300 border border-primary left-0 w-full rounded`}>
                    {countries.map((country, index) => <p key={index} className="p-0.5 rounded leading-5 hover:bg-blue-600 active:bg-blue-500 active:text-white">{country.name.common}</p>)}
                </div>
            </div>


            {/* <div className="relative mb-5">
                <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    value={fieldValues.name}
                    onChange={fieldValuesHandler}
                    name="name"
                    placeholder="Enter your name"
                    className={`w-full bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-200 py-2 lg:py-3 outline-none px-3 lg:px-4 rounded-md border-[1px] dark:border-2 ${errorIn === "name" ? "border-red-500" : "border-transparent"}`}
                />
                <p
                    className={`absolute right-1 text-xs font-medium mt-1 ${fieldValues.name.length >= 100 ? "text-red-500" : "text-gray-600 dark:text-gray-300"
                        }`}
                >{`${fieldValues.name.length}/100`}</p>
            </div>
            <div className="relative mb-5">
                <input
                    type="email"
                    onKeyDown={handleKeyDown}
                    value={fieldValues.email}
                    onChange={fieldValuesHandler}
                    name="email"
                    placeholder="Enter your email"
                    className={`w-full bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-200 py-2 lg:py-3 outline-none px-3 lg:px-4 rounded-md border-[1px] dark:border-2 ${errorIn === "email" ? "border-red-500" : "border-transparent"}`}
                />
                <p
                    className={`absolute right-1 text-xs font-medium mt-1 ${fieldValues.email.length >= 254 ? "text-red-500" : "text-gray-600 dark:text-gray-300"
                        }`}
                >{`${fieldValues.email.length}/254`}</p>
            </div>
            <div className="relative mb-5">
                <textarea
                    name="query"
                    onKeyDown={handleKeyDown}
                    value={fieldValues.query}
                    onChange={fieldValuesHandler}
                    placeholder="Type your message..."
                    className={`w-full bg-gray-100 dark:placeholder:text-gray-600 dark:bg-gray-200 py-2 lg:py-3 outline-none px-3 lg:px-4 rounded-md min-h-48 lg:min-h-60 border-[1px] dark:border-2 ${errorIn === "query" ? "border-red-500" : "border-transparent"}`}
                ></textarea>
                <p
                    className={`absolute right-1 text-xs font-medium ${fieldValues.query.length >= 1000
                        ? "text-red-500"
                        : "text-gray-600 dark:text-gray-300"
                        }`}
                >{`${fieldValues.query.length}/1000`}</p>
            </div>

            <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
            ></input> */}
        </form>}

    </section>
}

export default Address;