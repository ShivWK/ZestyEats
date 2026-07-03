const cleanOnLogout = ({
  dispatch,
  setItemToCart,
  toggleItemsToBeAddedInCart,
  setFavoriteRestaurant,
  addRecentLocations,
  addToWishlistItem,
}) => {
  console.log('cleaner called');

  const CART = 'CartItems';
  const ITEMSTOBEADDEDINCART = 'ItemsToBeAddedInCart';
  const WISHLIST = 'wishlist';
  const RECENTLOCATIONS = 'recentLocations';
  const FAVORITERESTROS = 'favRestros';

  dispatch(setItemToCart({ mode: 'initial', object: {} }));
  localStorage.removeItem(CART);

  dispatch(toggleItemsToBeAddedInCart({ mode: 'initial', object: {} }));
  localStorage.removeItem(ITEMSTOBEADDEDINCART);

  dispatch(setFavoriteRestaurant({ mode: 'initial', object: [] }));
  localStorage.removeItem(FAVORITERESTROS);

  dispatch(addRecentLocations([]));
  localStorage.removeItem(RECENTLOCATIONS);

  dispatch(addToWishlistItem({ mode: 'initial', object: {} }));
  localStorage.removeItem(WISHLIST);
};

export default cleanOnLogout;
