import { NavLink } from "react-router-dom";

const PlaceCards = ({ data }) => {
    return <NavLink className="flex justify-center items-center text-center h-16 flex-wrap border-[1px] border-gray-400 w-56 px-5 rounded-2xl">
        <p className="font-medium text-gray-900 ">{data.text}</p>
    </NavLink>
}

export default PlaceCards;