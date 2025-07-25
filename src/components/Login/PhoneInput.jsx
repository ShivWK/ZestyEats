import { useState } from "react";
import mainData from "./data"

const PhoneInput = () => {
    console.log(mainData.find(item => item.country_code === "IN"));

    const [ dataToShow, setDataToShow ] = useState(mainData);
    const [ searchValue, setSearchValue ] = useState("");
    const [ selectedCity, setSelectedCity ] = useState();
    const [ isDropDownOpen, setDropdownOpen ] = useState(false);

    const changeHandler = () => {

    }

    const clickHandler = () => {

    }

    return <div className="flex items-center">
        <div className="flex items-center gap-1">
            <p>{selectedCity.flag}</p>
            <i
                className="fa-solid fa-caret-down text-gray-900 transition-all duration-300 linear"
                style={{
                  transform: isDropDownOpen ? "rotate(-180deg)" : "",
                }}
              ></i>
        </div>
        <div className="flex items-center">
            <div>
                <span>
                    {selectedCity.tele_code}
                </span>
            </div>
            

        </div>
    </div>
}

export default PhoneInput;