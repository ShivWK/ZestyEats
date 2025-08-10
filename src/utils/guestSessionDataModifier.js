export const recentLocationModifier = async (locations, loggedIn, deviceId) => {
    let path = null;

    if (loggedIn) path = `${import.meta.env.VITE_BASE_URL}/api/userActivity/userRecentLocationData`;
    else path = `${import.meta.env.VITE_BASE_URL}/api/user/recentLocations`;

    try {
        const res = await fetch(path, {
            method: "PATCH",
            body: JSON.stringify({ recentLocations: locations }),
            headers: {
                "Content-Type": "application/json",
                "x-device-id": deviceId,
                "x-user-agent": navigator.userAgent,
                "x-language": navigator.language,
                "x-resolution": `${screen.height}x${screen.width}`,
                "x-timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            credentials: "include"
        })

        const data = await res.json();
        // console.log(data);
    } catch (err) {
        console.error("Error in setting recent location", err)
    }
}

export const favRestaurantsModifier = async (restaurants, loggedIn, deviceId) => {
    let path = null;

    if (loggedIn) path = `${import.meta.env.VITE_BASE_URL}/api/userActivity/userFavRestaurantData`;
    else path = `${import.meta.env.VITE_BASE_URL}/api/user/favRestaurants`;

    try {
        const res = await fetch(path, {
            method: "PATCH",
            body: JSON.stringify({ favRestaurants: restaurants }),
            headers: {
                "Content-Type": "application/json",
                "x-device-id": deviceId,
                "x-user-agent": navigator.userAgent,
                "x-language": navigator.language,
                "x-resolution": `${screen.height}x${screen.width}`,
                "x-timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            credentials: "include"
        })

        const data = await res.json();
        // console.log(data.data.data.favRestaurants);
    } catch (err) {
        console.error("Error in setting recent location", err)
    }
}

export const wishListedItemsModifier = async (items, loggedIn, deviceId) => {
    let path = null;

    if (loggedIn) path = `${import.meta.env.VITE_BASE_URL}/api/userActivity/userWishListData`;
    else path = `${import.meta.env.VITE_BASE_URL}/api/user/wishListedItems`;

    try {
        const res = await fetch(path, {
            method: "PATCH",
            body: JSON.stringify({ wishListedItems: items }),
            headers: {
                "Content-Type": "application/json",
                "x-device-id": deviceId,
                "x-user-agent": navigator.userAgent,
                "x-language": navigator.language,
                "x-resolution": `${screen.height}x${screen.width}`,
                "x-timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            credentials: "include"
        })

        const data = await res.json();
        // console.log(data.data.data.wishListedItems);
    } catch (err) {
        console.error("Error in setting recent location", err)
    }
}

export const itemsToBeAddedInCartModifier = async (items, loggedIn, deviceId) => {
    let path = null;

    if (loggedIn) path = `${import.meta.env.VITE_BASE_URL}/api/userActivity/userItemsToBeAddedInCartData`;
    else path = `${import.meta.env.VITE_BASE_URL}/api/user/itemsToBeAddedInCart`;

    try {
        const res = await fetch(path, {
            method: "PATCH",
            body: JSON.stringify({ itemsToBeAddedInCart: items }),
            headers: {
                "Content-Type": "application/json",
                "x-device-id": deviceId,
                "x-user-agent": navigator.userAgent,
                "x-language": navigator.language,
                "x-resolution": `${screen.height}x${screen.width}`,
                "x-timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            credentials: "include"
        })

        const data = await res.json();
        // console.log(data.data.data.itemsToBeAddedInCart);
    } catch (err) {
        console.error("Error in setting recent location", err)
    }
}

export const cartItemsModifier = async (items, loggedIn, deviceId) => {
    let path = null;

    if (loggedIn) path = `${import.meta.env.VITE_BASE_URL}/api/userActivity/userCartData`;
    else path = `${import.meta.env.VITE_BASE_URL}/api/user/cartItems`;

    // console.log("Called")
    try {
        const res = await fetch(path, {
            method: "PATCH",
            body: JSON.stringify({ cartItems: items }),
            headers: {
                "Content-Type": "application/json",
                "x-device-id": deviceId,
                "x-user-agent": navigator.userAgent,
                "x-language": navigator.language,
                "x-resolution": `${screen.height}x${screen.width}`,
                "x-timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            credentials: "include"
        })

        const data = await res.json();
        // console.log(data);
    } catch (err) {
        console.error("Error in setting recent location", err)
    }
}