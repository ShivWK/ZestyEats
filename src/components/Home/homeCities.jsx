// Done

import { selectAvailableCities } from '../../features/home/homeSlice';
import { useSelector } from 'react-redux';
import { Suspense, useState, useRef } from 'react';
import PlaceCardsContainer from './PlaceCardsContainer';
import PlaceCards from './PlaceCards';
import createDebounce from '../../utils/debounceCreator';
import Loader from '../Loader';
import dummyArray from '../../utils/DummyArray';

const HomeCities = () => {
  // console.log("HomeCities rendered")
  const cities = useSelector(selectAvailableCities);
  const [matchedCities, setMatchedCites] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const shownCities = cities.slice(6);
  const SHIMMER_ARRAY = dummyArray(4);

  const changeHandler = useRef(
    createDebounce((text) => {
      if (text.trim() === '') return setMatchedCites([]);

      const matched = cities.filter((city) => {
        return city.text.toLowerCase().startsWith(text.trim().toLowerCase());
      });

      setMatchedCites(matched);
    }, 400),
  );

  const cityClickHandler = async (
    data,
    trigger,
    setLoading,
    dataUpdater,
    dispatch,
    setSecondaryCity,
  ) => {
    const city = data?.text.toLowerCase().replace(/\s/g, '-');
    dispatch(setSecondaryCity(data?.text));
    dispatch(setLoading(true));

    try {
      const data = await trigger({ city }).unwrap();
      dataUpdater(data, dispatch);
    } catch (err) {
      console.log('Some error occurred', err);
      dispatch(setLoading(false));
      throw new Error('Cant fetch city home data');
    }
  };

  const crossHandler = () => {
    setInputValue('');
    setMatchedCites(null);
  };

  const handleSearch = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() !== '') {
      changeHandler.current(e.target.value);
    }
    if (e.target.value === '') setMatchedCites(null);
  };

  return (
    <section className="mx-auto flex w-full flex-col items-center gap-4 md:max-w-[1000px]">
      <Suspense
        fallback={
          <div className="flex justify-between gap-4">
            {SHIMMER_ARRAY.map((i) => (
              <div key={i} className="shimmerBg h-20 w-60 rounded-xl" />
            ))}
          </div>
        }
      >
        {' '}
        <>
          <h3 className="self-start dark:text-white">
            Find food and restaurants in
          </h3>
          <div
            id="searchBAr"
            className="mt=1 mb-3 flex w-full items-center gap-1.5 rounded-md border-b-2 bg-gray-100 p-2.5 py-1.5 dark:border-gray-300 dark:bg-gray-600/50"
          >
            <input
              className="basis-[98%] bg-transparent px-2 py-1 text-lg font-semibold text-gray-900 outline-none md:py-1.5 dark:text-gray-200 dark:placeholder:text-gray-400"
              type="text"
              value={inputValue}
              onChange={handleSearch}
              placeholder="Search for the city you want"
            />
            {inputValue !== '' ? (
              <i
                onClick={crossHandler}
                className="ri-close-large-fill cursor-pointer text-2xl dark:text-white"
              ></i>
            ) : (
              <i className="ri-search-2-line cursor-pointer text-2xl dark:text-white"></i>
            )}
          </div>
          {inputValue.trim() !== '' ? (
            matchedCities === null ? (
              <Loader size="small" />
            ) : matchedCities.length !== 0 ? (
              <div className="flex w-full flex-wrap justify-around gap-x-2.5 gap-y-5 md:gap-x-8">
                {matchedCities.map((place) => (
                  <PlaceCards
                    key={place?.text + Math.random()}
                    data={place}
                    clickHandler={cityClickHandler}
                    path={'DIY'}
                  />
                ))}
              </div>
            ) : (
              <p className="font-semibold text-gray-700">
                Sorry, we don't serve this location yet.
              </p>
            )
          ) : (
            <PlaceCardsContainer
              data={shownCities}
              clickHandler={cityClickHandler}
              showHeading={false}
              path="DIY"
            />
          )}
        </>
      </Suspense>
    </section>
  );
};

export default HomeCities;
