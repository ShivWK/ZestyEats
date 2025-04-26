import FoodieThoughts from './FoodieThoughts/FoodieThoughts';
import TopRestaurantChains from '../TopRestaurantsChain/TopRestaurantChains';
import OnlineDeliveryRestaurant from './OnlineDeliveryRestaurant';
import BestPlacesToEat from './BestPlacesToEat';
import NearByRestaurants from './NearByRestaurants';
import { useGetHomePageDataQuery } from '../../features/home/homeApiSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
    addFoodieThoughtsData,
    addTopRestaurantsData,
    addApiData
} from '../../features/home/homeSlice';

export default function Home() {
    const dispatch = useDispatch();
    const { data, isLoading } = useGetHomePageDataQuery();
    
    useEffect(()=> {
        if (!data) return;
        dispatch(addApiData(data));
        dispatch(addFoodieThoughtsData(data))
        dispatch(addTopRestaurantsData(data))
    }, [data])

    return <main className='w-full max-w-[1070px] mx-auto pb-14 pr-1' >
        <section className='w-full max-w-[1040px] mx-auto'>
            <FoodieThoughts isLoading={isLoading}/>
        </section>
        <hr className='mt-12 mb-9 text-gray-300'/>
        <section className='w-full max-w-[1040px] mx-auto'>
            <TopRestaurantChains isLoading={isLoading} />
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

