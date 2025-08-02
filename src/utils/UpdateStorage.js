const UpdateStorage = ({
    sessionData,
    dispatch,
    setItemToCart,
    toggleItemsToBeAddedInCart,
    setFavoriteRestro,
    addRecentLocations,
    addToWishlistItem
}) => {
    const mainData = sessionData.data.data;

    console.log( "from", mainData)

    const CART = "CartItems";
    const ITEMSTOBEADDEDINCART = "ItemsToBeAddedInCart";
    const WISHLIST = "wishlist";
    const RECENTLOCATIONS = "recentLocations";
    const FAVORITERESTROS = "favRestros";

    const cartItems = mainData?.cartItems;
    if (cartItems != null) {
        dispatch(setItemToCart({ mode: "initial", object: cartItems }));
        localStorage.setItem(CART, JSON.stringify(cartItems));
    } else {
        dispatch(setItemToCart({ mode: "initial", object: {} }));
        localStorage.removeItem(CART);
    }

    const itemsToBeAddedInCart = mainData?.itemsToBeAddedInCart;
    if (itemsToBeAddedInCart != null) {
        dispatch(toggleItemsToBeAddedInCart({ mode: "initial", object: itemsToBeAddedInCart }));
        localStorage.setItem(ITEMSTOBEADDEDINCART, JSON.stringify(itemsToBeAddedInCart));
    } else {
        dispatch(toggleItemsToBeAddedInCart({ mode: "initial", object: {} }));
        localStorage.removeItem(ITEMSTOBEADDEDINCART);
    }

    const favRestaurants = mainData?.favRestaurants;
    if (favRestaurants != null && favRestaurants.length !== 0) {
        dispatch(setFavoriteRestro({ mode: "initial", object: favRestaurants }));
        localStorage.setItem(FAVORITERESTROS, JSON.stringify(favRestaurants));
    } else {
        dispatch(setFavoriteRestro({ mode: "initial", object: [] }));
        localStorage.removeItem(FAVORITERESTROS)
    }

    const recentLocations = mainData?.recentLocations;
    if (recentLocations != null && recentLocations.length !== 0 ) {
        dispatch(addRecentLocations(recentLocations));
        localStorage.setItem(RECENTLOCATIONS, JSON.stringify(recentLocations))
    } else {
        dispatch(addRecentLocations([]));
        localStorage.removeItem(RECENTLOCATIONS);
    }

    const wishlist = mainData?.wishListedItems;
    if (wishlist != null) {
        dispatch(addToWishlistItem({ mode: "initial", object: wishlist }));
        localStorage.setItem(WISHLIST, JSON.stringify(wishlist));
    } else {
        dispatch(addToWishlistItem({ mode: "initial", object: {} }));
        localStorage.removeItem(WISHLIST);
    }

    // console.log("Session data", mainData);
    // console.log("cartItems", cartItems);
    // console.log("itemsToBeAddedToCart", itemsToBeAddedInCart);
    // console.log("favRestaurants", favRestaurants);
    // console.log("recentLocation", recentLocations);
    // console.log("wishlist", wishlist);
}

export default UpdateStorage;