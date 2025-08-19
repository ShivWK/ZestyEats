import { Package, CircleUserRound, IndianRupee, MapPinCheck } from "lucide-react"

const AddressCard = ({ data }) => {
    const { deliveryAddress: { address }, payment } = data
    console.log(address, payment);

    const addressArr = [
        {
            textMain: address.userName,
            textSecondary: address.userPhone,
            logo: <CircleUserRound strokeWidth={2}/>
        },

        {
            textMain: "Payment method",
            textSecondary: payment.method === "COD" ? "COD (Cash on delivery)" : `Online (${payment.transactionId})`,
            logo: <IndianRupee strokeWidth={2}/>
        },

        {
            textMain: "Delivery address",
            textSecondary: `${address.flatNumber}, ${address.state}, ${address.pinCode}, ${address.country}.`,
            logo: <MapPinCheck strokeWidth={2}/>
        },
    ]

    return <section>
        <div className="flex items-center gap-1">
            <Package size={18} strokeWidth={2}/>
            <h2 className="text-lg">Delivery Details</h2>
        </div>

        <div className="mt-4 flex flex-col gap-2">
            {addressArr.map(data => {
                return <div className="flex gap-3 items-center">
                    <div className="">{data.logo}</div>
                    <div className="flex flex-col">
                        <p className="text-black font-semibold tracking-wider">{data.textMain}</p>
                        <p className="line-clamp-2 text-sm text-gray-600">{data.textSecondary}</p>
                    </div>
                </div>
            })

            }
        </div>
    </section>
}

export default AddressCard;