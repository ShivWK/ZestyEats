import { useGetTopRestaurantChainQuery } from "../../features/home/homeApiSlice"

export default function TopRestaurantChains() {
    const { data } = useGetTopRestaurantChainQuery();
    // console.log(data)

    return <h3>I'm TopRestaurantChains</h3>
}