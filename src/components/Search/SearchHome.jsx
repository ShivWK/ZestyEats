import { useSelector } from "react-redux";
import { selectLatAndLng } from "../../features/home/homeSlice";
import { useEffect, useState } from "react";

const SearchHome = () => {
    const { lat, lng } = useSelector(selectLatAndLng); 
    const [ homeData, setHomeData ] = useState([]);

    useEffect(() => {

    }, [])

    return <div>
        
    </div>
}

export default SearchHome;