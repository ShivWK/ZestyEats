import {
    addYourCurrentCity,
    addSearchedCityAddress
} from "../features/home/homeSlice";

export const updateCurrentCity = (data, dispatch) => {
    const localityObject = data?.data?.[0]?.["address_components"].find(
        (item) => item?.["types"].includes("locality")
    );

    const city = localityObject?.["short_name"];
    const address = data?.data?.[0]?.["formatted_address"];

    localStorage.setItem("currentCity", JSON.stringify(city))
    localStorage.setItem("searchedCityAddress", JSON.stringify(address))

    dispatch(addYourCurrentCity(city));
    dispatch(addSearchedCityAddress(address));
}