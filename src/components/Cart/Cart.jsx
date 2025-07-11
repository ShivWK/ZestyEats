import MobileFooterMenu from "../Footer/MobileFooterMenu";
import Construction from "../../utils/Construction";
import { selectCart } from "../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";
import Billing from "./Billing";

const Cart = () => {
    const mainCart = Object.values(useSelector(selectCart));

    if (mainCart.length !== 0) {
        const cart = mainCart.map(item => ({ item: item.item, quantity: item.quantity }))
        cart.push(mainCart[0].restaurantData);
        cart.reverse();

        // console.log(cart)

        return <>
            <main className="w-full h-full bg-gray-200">
                <div className="w-full flex flex-col max-md:gap-3 md:flex-row justify-between md:max-w-[1210px] pt-20 max-md:px-1.5 md:pt-28 pb-12 mx-auto md:px-3">
                    <RestaurantCard data={cart} />
                    <Billing />
                </div>
            </main>
            <MobileFooterMenu />
        </>
    } else {
        return <>
            <main className="w-full bg-gray-200">
                <div className="w-full flex items-center justify-center md:max-w-[1210px] pt-20 max-md:px-1.5 md:pt-28 pb-12 mx-auto md:px-3">
                   <p>No items in cart</p>
                </div>
            </main>
            <MobileFooterMenu />
        </>
    }
}

export default Cart;