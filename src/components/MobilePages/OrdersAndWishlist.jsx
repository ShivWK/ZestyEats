// Done
import { useState } from 'react';
import MobileFooterMenu from './../Footer/MobileFooterMenu';
import WishlistedItems from './Wishlisttems/WishlistedItems';
import FavoriteRestros from './FavoriteRestros';
import OrderMain from '../orders/OrderMain';

const OrdersAndWishlist = () => {
  // console.log("MobilePages/OrdersAndWishlist rendered");
  const [currentTab, setCurrentTab] = useState('Orders');

  return (
    <main className={`px-1.5 pt-18 pb-16`}>
      <div className="rounded bg-white p-0.5 dark:bg-gray-800">
        <section className="w-full rounded border-[1px] border-gray-300 bg-white p-1 dark:bg-gray-800">
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentTab('Orders')}
              className="flex h-full basis-[49%] items-center justify-center gap-2.5 rounded border-[1px] border-gray-300 py-1 transition-all duration-150 ease-linear"
              style={{
                backgroundColor: currentTab === 'Orders' ? '#d1d5dc' : 'white',
              }}
            >
              <i className="ri-box-3-fill text-2xl text-[#2196F3]"></i>
              <span>Orders</span>
            </button>
            <button
              onClick={() => setCurrentTab('Wishlist')}
              className="flex h-full basis-[49%] items-center justify-center gap-2.5 rounded border-[1px] border-gray-300 py-1 transition-all duration-150 ease-linear"
              style={{
                backgroundColor:
                  currentTab === 'Wishlist' ? '#d1d5dc' : 'white',
              }}
            >
              <i className="ri-heart-2-fill text-2xl text-[rgb(255,0,0)]"></i>
              <span>Wishlist</span>
            </button>
          </div>
          <button
            onClick={() => setCurrentTab('FavRestros')}
            className="mt-1.5 flex h-full w-full items-center justify-center gap-2.5 rounded border-[1px] border-gray-300 py-1 transition-all duration-150 ease-linear"
            style={{
              backgroundColor:
                currentTab === 'FavRestros' ? '#d1d5dc' : 'white',
            }}
          >
            <i className="ri-store-3-fill text-primary text-2xl"></i>
            <span>Favorite Restaurants</span>
          </button>
        </section>
        {currentTab === 'Orders' ? (
          <section className="mt-1">
            <div className="bg-primary dark:bg-darkPrimary w-full rounded px-2 py-1.5 text-xl font-semibold text-white">
              <p>Orders</p>
            </div>
            <OrderMain />
          </section>
        ) : currentTab === 'Wishlist' ? (
          <section className="mt-1">
            <div className="bg-primary dark:bg-darkPrimary w-full rounded px-2 py-1.5 text-xl font-semibold text-white">
              <p>Wishlist</p>
            </div>
            <WishlistedItems />
          </section>
        ) : (
          <section className="mt-1">
            <div className="bg-primary dark:bg-darkPrimary w-full rounded px-2 py-1.5 text-xl font-semibold text-white">
              <p>Favorite Restaurants</p>
            </div>
            <FavoriteRestros />
          </section>
        )}
      </div>
      <MobileFooterMenu />
    </main>
  );
};

export default OrdersAndWishlist;
