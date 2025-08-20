import { Package, CircleUserRound, IndianRupee, MapPinCheck, CalendarCheck } from "lucide-react"

const AddressCard = ({ data }) => {
    const { deliveryAddress: { address }, payment, createdAt } = data
    // console.log(data);

    const giveHumanReadableDate = (dateString) => {
        const date = new Date(dateString);

        const inIndianTime = date.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            month: "long",
            year: "numeric",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

        return inIndianTime;
    }

    const addressArr = [
        {
            textMain: address.userName,
            textSecondary: address.userPhone,
            logo: <CircleUserRound size={28} strokeWidth={1}/>
        },

        {
            textMain: "Payment method",
            textSecondary: payment.method === "COD" ? "COD (Cash on delivery)" : `Online (${payment.transactionId})`,
            logo: <IndianRupee size={28} strokeWidth={1}/>
        },

        {
            textMain: "Delivery address",
            textSecondary: `${address.flatNumber}, ${address.state}, ${address.pinCode}, ${address.country}.`,
            logo: <MapPinCheck size={28} strokeWidth={1}/>
        },

        {
            textMain: "Order placed on",
            textSecondary: giveHumanReadableDate(createdAt),
            logo: <CalendarCheck size={28} strokeWidth={1}/>
        },
    ]

    return <section>
        <div className="flex items-center gap-1">
            <Package size={18} strokeWidth={2}/>
            <h2 className="text-lg">Delivery Details</h2>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
            {addressArr.map(data => {
                return <div className="flex gap-3 items-center">
                    <div className="">{data.logo}</div>
                    <div className="flex flex-col">
                        <p className="text-black font-semibold tracking-wider">{data.textMain}</p>
                        <p className="line-clamp-2 text-sm text-gray-600 leading-5">{data.textSecondary}</p>
                    </div>
                </div>
            })

            }
        </div>
    </section>
}

export default AddressCard;