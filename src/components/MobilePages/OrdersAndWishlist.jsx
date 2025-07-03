import { useState } from "react";
import MobileFooterMenu from "./../Footer/MobileFooterMenu";
import Construction from "../../utils/Construction";
import WishlistedItems from "./Wishlisttems/WishlistedItems";
import { selectWishlistItems } from "../../features/home/restaurantsSlice";
import { useSelector } from "react-redux";

const OrdersAndWishlist = () => {
    const [currentTab, setCurrentTab] = useState('Wishlist')
    const wishlist = useSelector(selectWishlistItems);

    return <main className={`pt-20 pb-16 px-1.5`}>
        <div className="bg-white p-0.5 rounded ">
            <section className="w-full p-1 flex justify-between bg-white rounded border-[1px] border-gray-300">
                <button onClick={() => setCurrentTab("Orders")} className="basis-[49%] h-full flex gap-2.5 items-center justify-center border-[1px] border-gray-300 rounded py-1 transition-all duration-150 ease-linear" style={{backgroundColor: currentTab === "Orders" ? "#d1d5dc" : "white"}}>
                    <i className="ri-box-3-fill text-2xl text-[#2196F3]"></i>
                    <span>Orders</span>
                </button>
                <button onClick={() => setCurrentTab("Wishlist")} className="basis-[49%] h-full flex gap-2.5 items-center justify-center border-[1px] border-gray-300 rounded py-1 transition-all duration-150 ease-linear" style={{backgroundColor: currentTab === "Wishlist" ? "#d1d5dc" : "white"}}>
                    <i className="ri-heart-2-fill text-2xl text-[rgb(255,0,0)]"></i>
                    <span>Wishlist</span>
                </button>
            </section>
            {currentTab === "Orders"
                ? <section className="overflow-hidden mt-1">
                    <div className="w-full bg-primary text-white font-semibold text-xl px-2 py-1.5 rounded ">
                        <p>Orders</p>
                    </div>
                    <Construction />
                </section>
                : <section className="overflow-hidden mt-1">
                    <div className="w-full bg-primary text-white font-semibold text-xl px-2 py-1.5 rounded ">
                        <p>Wishlist</p>
                    </div>
                    <WishlistedItems />
                </section>
            }
        </div>
        <MobileFooterMenu />
    </main>
}

export default OrdersAndWishlist;