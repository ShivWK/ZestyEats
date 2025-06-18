import BreadcrumbsWrapper from "./BreadcrumbsWrapper";
import { useNavigate } from "react-router-dom";

const SearchContainer = ({
  placeholder,
  Child = null,
  searchTerm,
  handleSearch,
  crossHandler,
}) => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 w-full max-w-[850px] mx-auto min-h-[105vh] bg-white">
      <div className="fixed bg-white py-3 z-20">
        <div className="mt-4 mb-5">
          <BreadcrumbsWrapper
            normalTextColor={"#4a5565"}
            mainTextColor={"#101828"}
            delimiterColor={"text-gray-600"}
          />
        </div>
        <div className="flex w-full items-center gap-1.5 p-2.5 py-1.5 border-b-2 rounded-md bg-gray-200 ">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-long-fill text-3xl cursor-pointer transform hover:translate-x-[-5px] transition-all duration-300 ease-in-out"
          ></i>
          <div>
            <input
              className="text-gray-900 py-1.5 px-2 outline-none bg-transparent text-lg font-semibold"
              type="text"
              size={79}
              value={searchTerm}
              onChange={handleSearch}
              placeholder={placeholder}
            />
          </div>
          {searchTerm !== "" ? (
            <i
              onClick={crossHandler}
              className="ri-close-large-fill text-xl cursor-pointer"
            ></i>
          ) : (
            <i className="ri-search-2-line text-xl cursor-pointer"></i>
          )}
        </div>
      </div>
      <div className="p-2 mt-28">{<Child />}</div>
    </div>
  );
};

export default SearchContainer;
