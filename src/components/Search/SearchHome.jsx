import { useSelector } from "react-redux";
import { selectLatAndLng } from "../../features/home/homeSlice";
import { useEffect, useState } from "react";
import { useLazyGetSearchHomeDataQuery } from "../../features/search/homeSearchApiSlice";

const SearchHome = () => {
    const [trigger] = useLazyGetSearchHomeDataQuery();
    const { lat, lng } = useSelector(selectLatAndLng);
    const [homeData, setHomeData] = useState(null);

    useEffect(() => {
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