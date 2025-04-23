import FoodieThoughts from './FoodieThoughts/FoodieThoughts';
import TopRestaurantChains from './TopRestaurantChains';
import OnlineDeliveryRestaurant from './OnlineDeliveryRestaurant';
import BestPlacesToEat from './BestPlacesToEat';
import NearByRestaurants from './NearByRestaurants';
import { useGetHomePageDataQuery } from '../../features/home/homeApiSlice';
import { useEffect, useState } from 'react';

export default function Home() {
    const [foodieThoughtsData, setFoodieThoughtsData] = useState([])
    const { data, isLoading } = useGetHomePageDataQuery();

    useEffect(()=> {
        const result = data?.data?.cards?.find(
            item => item?.card?.card?.id === "whats_on_your_mind"
        )
        .card?.card?.imageGridCards?.info || [];

        setFoodieThoughtsData(result);
    }, [data])

    return <main className='w-full max-w-[1070px] mx-auto ' >
        <section className='w-full max-w-[1040px] mx-auto'>
            <FoodieThoughts data={foodieThoughtsData} isLoading={isLoading}/>
        </section>
        <hr className='my-12 text-gray-300'/>
        <section className='w-full max-w-[1040px] mx-auto'>
            <TopRestaurantChains />
        </section>
        {/* <hr /> */}
        <section>
            {/* <OnlineDeliveryRestaurant /> */}
        </section>
        <section>
            {/* <BestPlacesToEat /> */}
        </section>
        <section>
            {/* <NearByRestaurants /> */}
        </section>
    </main>
}

// If we have given clear heading in our sections then we dont need to aria-label to the sections because screen readers will use headings.

