import FoodieThoughts from './FoodieThoughts/FoodieThoughts';
import TopRestaurantChains from './TopRestaurantChains';
import OnlineDeliveryRestaurant from './OnlineDeliveryRestaurant';
import BestPlacesToEat from './BestPlacesToEat';
import NearByRestaurants from './NearByRestaurants';

export default function Home() {

    return <main className='w-full max-w-[1040px] mx-auto' >
        <section>
            <FoodieThoughts />
        </section>
        <section className='mt-60'>
            <TopRestaurantChains />
        </section>
        <section>
            <OnlineDeliveryRestaurant />
        </section>
        <section>
            <BestPlacesToEat />
        </section>
        <section>
            <NearByRestaurants />
        </section>
    </main>
}

// If we have given clear heading in our sections then we dont need to aria-label to the sections because screen readers will use headings.

