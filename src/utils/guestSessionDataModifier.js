export const recentLocationModifier = async (locations) => {
    try {
        const res = await fetch("https://swiggy-clone-klzu.onrender.com/api/user/recentLocations", {
            method: "PATCH",
            body: JSON.stringify({ recentLocations: locations }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json();
        // console.log(data);
    } catch (err) {
        console.error("Error in setting recent location", err)
    }
}

export const favRestaurantsModifier = async (restaurants) => {
    try {
        const res = await fetch("https://swiggy-clone-klzu.onrender.com/api/user/favRestaurants", {
            method: "PATCH",
            body: JSON.stringify({ favRestaurants: restaurants }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json();
        // console.log(data.data.data.favRestaurants);
    } catch (err) {
        console.error("Error in setting recent location", err)
    }
}

export const wishListedItemsModifier = async (items) => {
    try {
        const res = await fetch("https://swiggy-clone-klzu.onrender.com/api/user/wishListedItems", {
            method: "PATCH",
            body: JSON.stringify({ wishListedItems: items }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json();
        // console.log(data.data.data.wishListedItems);
    } catch (err) {
        console.error("Error in setting recent location", err)
    }
}

export const itemsToBeAddedInCartModifier = async (items) => {
    try {
        const res = await fetch("https://swiggy-clone-klzu.onrender.com/api/user/itemsToBeAddedInCart", {
            method: "PATCH",
            body: JSON.stringify({ itemsToBeAddedInCart: items }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json();
        // console.log(data.data.data.itemsToBeAddedInCart);
    } catch (err) {
        console.error("Error in setting recent location", err)
    }
}

export const cartItemsModifier = async (items) => {
    console.log("Called")
    try {
        const res = await fetch("https://swiggy-clone-klzu.onrender.com/api/user/cartItems", {
            method: "PATCH",
            body: JSON.stringify({ cartItems: items }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json();
        // console.log(data);
    } catch (err) {
        console.error("Error in setting recent location", err)
    }
}