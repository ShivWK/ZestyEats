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