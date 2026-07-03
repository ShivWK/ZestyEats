import { useEffect } from "react";
import { selectPathHistory } from "../features/home/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserFriendlyPathHistory } from "../features/home/homeSlice";

export const usePathHistoryFormatter = () => {
    const pathHistory = useSelector(selectPathHistory);
    const dispatch = useDispatch();

    useEffect(() => {
        const history = pathHistory.map((item) => {
            if (item === '/') return 'Home';
            else if (item === '/offers-dinouts') return 'Offers';
            else if (item === '/about') return 'About';
            else if (item === '/search') return 'Search';
            else if (item === '/help') return 'Help';
            else if (item === '/cart') return 'Cart';
            else if (item === '/dishSearch') return 'DishSearch';
            else if (item.includes('specificFood')) {
                return decodeURIComponent(item).split('/')[2];
            } else if (item?.includes('restaurantSpecific')) {
                return decodeURIComponent(item).split('/')[5];
            } else if (item === '/search/suggestions') return 'Suggestions';
            else if (item === '/search/searchResult/dishPage') return 'Dishes';
            else if (item === '/search/searchResult/restaurantPage')
                return 'Restaurants';
            else if (item.includes('/cityPage')) {
                const city = decodeURIComponent(item).split('/').at(-1);
                return `${city} City`;
            } else if (item.includes('/cityLocality')) {
                const locality = decodeURIComponent(item).split('/').at(-1);
                return `${locality} Locality`;
            } else if (item.includes('/cityDishes')) {
                const dish = decodeURIComponent(item).split('/').at(-1);
                return dish;
            } else if (item.includes('/legalAndPolicies')) return 'Legal & Policies';

            return item;
        });

        dispatch(setUserFriendlyPathHistory(history));
    }, [pathHistory, dispatch]);
}