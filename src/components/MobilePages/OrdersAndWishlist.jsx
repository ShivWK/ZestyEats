import { useState } from "react";
import MobileFooterMenu from "./../Footer/MobileFooterMenu";
import Construction from "../../utils/Construction";
import WishlistedItems from "./Wishlisttems/WishlistedItems";
import { selectWishlistItems } from "../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";
import FavoriteRestros from "./FavoriteRestros";

const OrdersAndWishlist = () => {
    const [currentTab, setCurrentTab] = useState('Wishlist')
    const wishlist = useSelector(selectWishlistItems);

    return <main className={`pt-18 pb-16 px-1.5`}>
        <div className="bg-white p-0.5 rounded ">
            <section className="w-full p-1 bg-white rounded border-[1px] border-gray-300">
                <div className="flex justify-between">
                    <button onClick={() => setCurrentTab("Orders")} className="basis-[49%] h-full flex gap-2.5 items-center justify-center border-[1px] border-gray-300 rounded py-1 transition-all duration-150 ease-linear" style={{ backgroundColor: currentTab === "Orders" ? "#d1d5dc" : "white" }}>
                        <i className="ri-box-3-fill text-2xl text-[#2196F3]"></i>
                        <span>Orders</span>
                    </button>
                    <button onClick={() => setCurrentTab("Wishlist")} className="basis-[49%] h-full flex gap-2.5 items-center justify-center border-[1px] border-gray-300 rounded py-1 transition-all duration-150 ease-linear" style={{ backgroundColor: currentTab === "Wishlist" ? "#d1d5dc" : "white" }}>
                        <i className="ri-heart-2-fill text-2xl text-[rgb(255,0,0)]"></i>
                        <span>Wishlist</span>
                    </button>
                </div>
                <button onClick={() => setCurrentTab("FavRestros")} className="mt-1.5 w-full h-full flex gap-2.5 items-center justify-center border-[1px] border-gray-300 rounded py-1 transition-all duration-150 ease-linear" style={{ backgroundColor: currentTab === "FavRestros" ? "#d1d5dc" : "white" }}>
                    <i className="ri-store-3-fill text-2xl text-primary"></i>
                    <span>Favorite Restaurants</span>
                </button>
            </section>
            {currentTab === "Orders"
                ? <section className="mt-1">
                    <div className="w-full bg-primary text-white font-semibold text-xl px-2 py-1.5 rounded ">
                        <p>Orders</p>
                    </div>
                    <Construction />
                </section>
                : (currentTab === "Wishlist") ? <section className="mt-1">
                    <div className="w-full bg-primary text-white font-semibold text-xl px-2 py-1.5 rounded ">
                        <p>Wishlist</p>
                    </div>
                    <WishlistedItems />
                </section>
                : <section className="mt-1">
                    <div className="w-full bg-primary text-white font-semibold text-xl px-2 py-1.5 rounded ">
                        <p>Favorite Restaurants</p>
                    </div>
                    <FavoriteRestros />
                </section>
            }
        </div>
        <MobileFooterMenu />
    </main>
}

export default OrdersAndWishlist;