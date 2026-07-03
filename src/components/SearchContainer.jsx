import { useRef } from 'react';
import BreadcrumbsWrapper from './BreadcrumbsWrapper';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const SearchContainer = ({
  placeholder,
  Child = null,
  searchTerm,
  handleSearch,
  crossHandler,
}) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const [searchParams] = useSearchParams();
  const nameRef = useRef(searchParams.get('name'));

  return (
    <div className="mx-auto min-h-[105vh] w-full bg-white pt-2 max-md:px-2 md:max-w-[850px] dark:bg-black">
      <div className="sticky top-15 z-20 overflow-hidden bg-white pt-2 md:pt-8 dark:bg-black">
        <div className="mt-4 mb-5">
          <BreadcrumbsWrapper
            normalTextColor={'#4a5565'}
            mainTextColor={'#101828'}
            delimiterColor={'text-gray-600'}
          />
        </div>
        {!pathname.includes('searchResult') ? (
          <div
            id="searchBAr"
            className="flex w-full items-center justify-evenly rounded-md border-b-2 bg-gray-100 px-2 py-1.5 dark:border-gray-300 dark:bg-gray-600/50"
          >
            {pathname.includes('dishSearch') && (
              <i
                onClick={() => navigate(-1)}
                className="ri-arrow-left-long-fill transform cursor-pointer text-3xl transition-all duration-300 ease-in-out hover:translate-x-[-5px]"
              ></i>
            )}
            <input
              className="basis-[95%] bg-transparent px-0.5 py-1 text-lg font-semibold text-gray-900 outline-none md:py-1.5 lg:px-1 dark:text-gray-200 dark:placeholder:text-gray-400"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder={placeholder}
            />
            {searchTerm !== '' ? (
              <i
                onClick={crossHandler}
                className="ri-close-large-fill cursor-pointer text-2xl dark:text-white"
              />
            ) : (
              <i className="ri-search-2-line cursor-pointer text-2xl dark:text-white" />
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate(-1)}
            className="flex w-fit cursor-pointer items-center"
          >
            <i className="ri-arrow-drop-left-line -ml-3.5 text-4xl dark:text-gray-200"></i>
            <p className="-ml-1 font-medium dark:text-gray-200">Back</p>
          </button>
        )}
      </div>
      <div className="">{<Child context={searchTerm} />}</div>
    </div>
  );
};

export default SearchContainer;
