const AddressModel = require("./../models/userAddressModel");

exports.getUserAddress = async (req, res, next) => {
    const userId = req.userID;

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
    const userId = req.userID;
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

exports.deleteUserAddress = (req, res, next) => {

}