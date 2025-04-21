import FoodieThoughts from './FoodieThoughts';
import TopRestaurantChains from './TopRestaurantChains';
import OnlineDeliveryRestaurant from './OnlineDeliveryRestaurant';
import BestPlacesToEat from './BestPlacesToEat';
import NearByRestaurants from './NearByRestaurants';
import { useGetfoodieThoughtsQuery } from '../../features/home/homeApiSlice';

export default function Home() {
    const data = useGetfoodieThoughtsQuery();
    console.log(data)

    return <main className='w-full max-w-[1040px] border-2 mx-auto' >
        <section>
            <h1>What's on your mind?</h1>
            <FoodieThoughts />
        </section>
        <section>
            <h2>Top restaurant chains in Chhindwara</h2>
            <TopRestaurantChains />
        </section>
        <section>
            <h2>Restaurants with online food delivery in Chhindwara</h2>
            <OnlineDeliveryRestaurant />
        </section>
        <section>
            <h2>Best Places to Eat Across Cities</h2>
            <BestPlacesToEat />
        </section>
        <section>
            <h2>Explore Every Restaurants Near Me</h2>
            <NearByRestaurants />
        </section>
    </main>
}

// If we have given clear heading in our sections then we dont need to aria-label to the sections because screen readers will use headings.

