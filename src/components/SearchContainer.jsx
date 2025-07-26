import { useRef } from "react";
import BreadcrumbsWrapper from "./BreadcrumbsWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

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
  const nameRef = useRef(searchParams.get("name"));

  return (
    <div className="pt-2 w-full max-md:px-2 md:max-w-[850px] mx-auto min-h-[105vh] dark:bg-black bg-white">
      <div className="sticky top-15 overflow-hidden dark:bg-black bg-white pt-2 md:pt-8 z-20">
        <div className="mt-4 mb-5">
          <BreadcrumbsWrapper
            normalTextColor={"#4a5565"}
            mainTextColor={"#101828"}
            delimiterColor={"text-gray-600"}
          />
        </div>
        {!pathname.includes("searchResult") ? (<div id="searchBAr" className="flex w-full items-center justify-evenly px-2 lg:px-2.5 py-1.5 border-b-2 rounded-md dark:bg-gray-600/50 bg-gray-100 ">
          {pathname.includes("dishSearch") && (<i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-long-fill text-3xl cursor-pointer transform hover:translate-x-[-5px] transition-all duration-300 ease-in-out"
          ></i>)
          }
          <input
            className="text-gray-900 py-1 md:py-1.5 px-0.5 lg:px-2 outline-none bg-transparent text-lg font-semibold basis-[95%] dark:placeholder:text-gray-400 dark:text-gray-200"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder={placeholder}
          />
          {searchTerm !== "" ? (
            <i
              onClick={crossHandler}
              className="ri-close-large-fill text-2xl cursor-pointer dark:text-white"
             />
          ) : (
            <i className="ri-search-2-line text-2xl cursor-pointer dark:text-white" />
          )}
        </div>)
          : <button onClick={() => navigate(-1)} className="w-fit flex items-center cursor-pointer">
            <i className="ri-arrow-drop-left-line text-4xl -ml-3.5 dark:text-gray-200"></i>
            <p className="-ml-1 font-medium dark:text-gray-200">Back</p>
          </button>
        }
      </div>
      <div className="">{<Child context={searchTerm} />}</div>
    </div>
  );
};

export default SearchContainer;
