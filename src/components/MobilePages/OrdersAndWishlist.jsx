import { useState } from "react";
import MobileFooterMenu from "./../Footer/MobileFooterMenu";
import Construction from "../../utils/Construction";

const OrdersAndWishlist = () => {
    const [currentTab, setCurrentTab] = useState('Orders')

    return <main className="pt-20 bg-[rgb(55,113,142)] h-full px-2 ">
        <div className="bg-white p-0.5 rounded ">
            <section className="w-full p-2 flex justify-between bg-white rounded border-[1px] border-gray-300">
                <button onClick={() => setCurrentTab("Orders")} className="basis-[49%] h-full flex gap-2.5 items-center justify-center border-[1px] border-gray-300 rounded py-1.5 transition-all duration-150 ease-linear" style={{backgroundColor: currentTab === "Orders" ? "#d1d5dc" : "white"}}>
                    <i className="ri-box-3-fill text-2xl text-[#2196F3]"></i>
                    <span>Orders</span>
                </button>
                <button onClick={() => setCurrentTab("Wishlist")} className="basis-[49%] h-full flex gap-2.5 items-center justify-center border-[1px] border-gray-300 rounded py-1.5 transition-all duration-150 ease-linear" style={{backgroundColor: currentTab === "Wishlist" ? "#d1d5dc" : "white"}}>
                    <i className="ri-heart-2-fill text-2xl text-[rgb(255,0,0)]"></i>
                    <span>Wishlist</span>
                </button>
            </section>
            {/* <hr className="text-gray-400 my-4 mx-1" /> */}
            {currentTab === "Orders"
                ? <section className="overflow-hidden border-[1px] border-gray-300 mt-1 rounded">
                    <div className="w-full bg-primary text-white font-semibold text-xl px-2 py-1.5 rounded ">
                        <p>Orders</p>
                    </div>
                    <Construction />
                </section>
                : <section className="overflow-hidden border-[1px] border-gray-300 mt-1 rounded">
                    <div className="w-full bg-primary text-white font-semibold text-xl px-2 py-1.5 rounded ">
                        <p>Wishlist</p>
                    </div>
                    <Construction />
                </section>
            }
        </div>
        <MobileFooterMenu />
    </main>
}

export default OrdersAndWishlist;