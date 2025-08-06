const SessionModel = require("./../models/authModals/sessionModel")

const cleanGuestSessionData = async (gSid) => {
    try {
        await SessionModel.findByIdAndUpdate(gSid, {
            $set: {
                "data.cartItems": {},
                "data.itemsToBeAddedInCart": {},
                "data.wishListedItems": {},
                "data.favRestaurants": [],
                "data.recentLocations": []
            }
        })
    } catch (err) {
        console.log("Error in cleaning the guest session", err);
    }
}

module.exports = cleanGuestSessionData;