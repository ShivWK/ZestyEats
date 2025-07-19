import MobileFooterMenu from "../Footer/MobileFooterMenu";
import { selectCart } from "../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";
import RestaurantCard from "./RestaurantCard";
import Billing from "./Billing";
import { useEffect, useState } from "react";

const Cart = () => {
    const mainCart = Object.values(useSelector(selectCart));
    const [overflowing, setOverflowing] = useState(false)

    useEffect(() => {
       const checkOverflow = () => {
         const htmlELe = document.documentElement;
        const clientHeight = htmlELe.clientHeight;
        const scrollHeight = htmlELe.scrollHeight;

        if ( scrollHeight > clientHeight ) {
            setOverflowing(true);
        } else {
            setOverflowing(false);
        }
       }

       checkOverflow();

       window.addEventListener("resize", checkOverflow);
       return () => window.removeEventListener("resize", checkOverflow);
    }, [document.documentElement.scrollHeight]);

    if (mainCart.length !== 0) {
        const cart = mainCart.map(item => ({ item: item.item, quantity: item.quantity }))
        cart.push(mainCart[0].restaurantData);
        cart.reverse();

        return <>
            <main className={`w-full min-h-[110%] ${!overflowing  && "h-full"} bg-gray-200`}>
                <div className="w-full flex flex-col max-md:gap-3 md:flex-row justify-between  md:max-w-[1070px] pt-20 max-md:px-1.5 md:pt-28 pb-28 mx-auto md:px-3">
                    <RestaurantCard data={cart} />
                    <Billing />
                </div>
            </main>
            <MobileFooterMenu />
        </>
    } else {
        return <>
            <main className="w-full h-full bg-gray-200">
                <div className="w-full flex items-center justify-center  md:max-w-[1070px] pt-20 max-md:px-1.5 md:pt-28 pb-12 mx-auto md:px-3">
                   <p>No items in cart</p>
                </div>
            </main>
            <MobileFooterMenu />
        </>
    }
}

export default Cart;