const AddressCard = ({ data }) => {
    const { deliveryAddress, payment } = data
    console.log(deliveryAddress, payment)

    return <h2 className="text-lg">
        Hi I'm Address
    </h2>
}

export default AddressCard;