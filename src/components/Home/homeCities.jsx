import { selectAvailableCities } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import { Suspense, useState, useRef } from "react";
import PlaceCardsContainer from "./PlaceCardsContainer";
import PlaceCards from "./PlaceCards";
import createDebounce from "../../utils/debounceCreater";

const HomeCities = () => {
    const cities = useSelector(selectAvailableCities);
    const [matchedCities, setMatchedCites] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const shownCities = cities.slice(6);
    const shimmerArray = Array.from({ length: 4 }, (_, i) => i);

    const changeHandler = useRef(createDebounce((text) => {
        if (text.trim() === "") return setMatchedCites([]);

        const matched = cities.filter(city => {
            return city.text.toLowerCase().startsWith(text.trim().toLowerCase());
        });

        setMatchedCites(matched)
    }, 400))


    const cityClickHandler = async (data, trigger, setLoading, dataUpdater, dispatch, setSecondaryCity) => {
        const city = data?.text.toLowerCase().replace(/\s/g, "-");
        dispatch(setSecondaryCity(data?.text));
        dispatch(setLoading(true));

        try {
            const data = await trigger({ city }).unwrap();
            dataUpdater(data, dispatch);
        } catch (err) {
            console.log("Some error occurred", err);
            dispatch(setLoading(false));
            throw new Error("Cant fetch city home data");
        }
    }

    const crossHandler = () => {
        setInputValue("");
        changeHandler.current("");
    }

    const handleSearch = (e) => {
        setInputValue(e.target.value);
        changeHandler.current(e.target.value);
    }

    return <section className="w-full md:max-w-[1000px] mx-auto flex items-center gap-4
                   flex-col">
        <Suspense
            fallback={
                <div className="flex justify-between gap-4">
                    {shimmerArray.map(i => <div key={i} className="w-60 h-20 rounded-xl shimmerBg" />)}
                </div>
            }
        >   <>
                <h3 className="self-start">Find food and restaurants in</h3>
                <div id="searchBAr" className="flex w-full items-center gap-1.5 p-2.5 py-1.5 border-b-2 rounded-md bg-gray-100 mb-3 mt=1">
                    <input
                        className="text-gray-900 py-1 md:py-1.5 px-2 outline-none bg-transparent text-lg font-semibold basis-[98%]"
                        type="text"
                        value={inputValue}
                        onChange={handleSearch}
                        placeholder="Search for the city you want"
                    />
                    {inputValue !== "" ? (
                        <i
                            onClick={crossHandler}
                            className="ri-close-large-fill text-2xl cursor-pointer"
                        ></i>
                    ) : (
                        <i className="ri-search-2-line text-2xl cursor-pointer"></i>
                    )}
                </div>
                {inputValue ? matchedCities.length !== 0
                    ? <div className="flex flex-wrap justify-around w-full gap-y-5 md:gap-x-8 gap-x-2.5">
                        {matchedCities.map(place => (
                            <PlaceCards key={place?.text + Math.random()} data={place} clickHandler={cityClickHandler} path={"DIY"} />
                        ))
                        }
                    </div>
                    : <p className="font-semibold text-gray-700">Sorry, we don't serve this location yet.</p>
                    : <PlaceCardsContainer data={shownCities} clickHandler={cityClickHandler} showHeading={false} path="DIY" />
                }
            </>
        </Suspense>
    </section>
}

export default HomeCities;