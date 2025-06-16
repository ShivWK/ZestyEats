import { useSelector } from "react-redux";
import { selectLatAndLng } from "../../features/home/homeSlice";
import { useEffect, useState } from "react";
import { useLazyGetSearchHomeDataQuery } from "../../features/search/searchApiSlice";

const SearchHome = () => {
    const [trigger, {isError, error}] = useLazyGetSearchHomeDataQuery();
    const { lat, lng } = useSelector(selectLatAndLng);
    const [homeData, setHomeData] = useState([]);

    console.log(isError, error)

    useEffect(() => {
        console.log(lat, lng)
        const functionTrigger = async () => {
            try {
                const data = await trigger({ lat, lng }).unwrap();
                setHomeData(data);
            } catch (err) {
                console.log("Failed to fetch the data",err);
            }
        }
        functionTrigger();
    }, [])

    console.log(homeData);

    return <div>helo</div>
}

export default SearchHome;