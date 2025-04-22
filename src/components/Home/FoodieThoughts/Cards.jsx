import { NavLink } from "react-router-dom"

export default function Cards({ data }) {
    return <NavLink className="shrink-0 w-36">
        <img 
            className="w-full h-44 rounded object-cover"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${data.imageId}`} 
            alt={data.accessibility.altText} 
        />
    </NavLink>
}