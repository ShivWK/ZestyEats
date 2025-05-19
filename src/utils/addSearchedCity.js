import { addSearchedCity, addSearchedCityAddress } from "../features/home/homeSlice";

export const updateSearchedCity = (location, dispatch) => {
    const city = location?.terms[0]?.value || "";
    const address =
        location?.terms[1]?.value === undefined
            ? ""
            : ", " + location?.terms[1]?.value + (location?.terms[2]?.value ? ", " + location?.terms[2]?.value : "");

    dispatch(addSearchedCity(city));
    dispatch(addSearchedCityAddress(address));

    localStorage.setItem("searchedCity", JSON.stringify(city));
    localStorage.setItem("searchedCityAddress", JSON.stringify(address));
    localStorage.removeItem("currentCity");
}