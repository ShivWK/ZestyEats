import { NavLink } from "react-router-dom";

const PlaceCards = ({ data }) => {
    return <NavLink className="flex justify-center items-center text-center flex-wrap border-[1px] border-gray-400 w-44 md:w-56 px-5 py-2 rounded-2xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-100 ease-in">
        <p className="font-medium text-gray-900 ">{data.text}</p>
    </NavLink>
}

export default PlaceCards;