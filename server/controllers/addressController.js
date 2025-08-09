const AddressModel = require("./../models/userAddressModel");

exports.getUserAddress = async (req, res, next) => {
    const userId = req.userID;

    console.log("userID" , userId);

    try {
        const result = await AddressModel.find({ userId });

        return res.status(200).json({
            status: "success",
            data: result
        })
    } catch (err) {
        console.log("Error occurred while fetching address", err)

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

exports.setUserAddress = async (req, res, next) => {
    const userId = req.UserID;
    console.log(userId)

    const data = req.body.address;

    try {
        await AddressModel.create({ 
            userId,
            country: data.country,
            userName: data.name,
            userPhone: data.phone,
            flatNumber: data.flatNumber,
            landmark: data.landmark,
            pinCode: data.pinCode,
            state: data.state
        });

        return res.status(200).json({
            status: "success",
            message: "Address added successfully."
        })
    } catch (err) {
        console.log("Error occurred while adding address", err)

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

exports.updateUserAddress = (req, res, next) => {

}

exports.deleteUserAddress = async (req, res, next) => {
    console.log("delete hit")
    const id = req.body.addressId;

    if (!id) {
        return res.status(400).json({
            status: "failed",
            message: "Please provide address id."
        })
    }

    try {
        await AddressModel.findByIdAndDelete(id);

        return res.status(200).json({
            status: "success",
            message: "Address deleted successfully"
        })
    } catch (err) {
        console.log("Error occurred while fetching address", err)

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}