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
        // console.log(data.data.data.recentLocations);
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
        console.log(data.data.data.favRestaurants);
    } catch (err) {
        console.error("Error in setting recent location", err)
    }
}