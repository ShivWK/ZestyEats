import { useEffect, useState } from "react";
import { selectDeviceFingerPrint } from "../../features/home/homeSlice";
import { useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import BillingCard from "./BillingCard";
import AddressCard from "./AddressCard";

const OrderMain = () => {
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);

    const deviceId = useSelector(selectDeviceFingerPrint);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/userActivity/orders`, {
                    method: "GET",
                    headers: {
                        "x-identifier": import.meta.env.VITE_HASHED_IDENTIFIER,
                        "Content-Type": "application/json",
                        "x-user-agent": navigator.userAgent,
                        "x-language": navigator.language,
                        "x-resolution": `${screen.height}x${screen.width}`,
                        "x-device-id": deviceId,
                    },
                    credentials: "include"
                });

                const orders = await result.json();
                if (!result.ok) throw new Error(orders.message);

                setOrders(orders.data);
                setOrdersLoading(false);

                console.log(orders);
            } catch (err) {
                console.log("Error in fetching orders", err);
                setOrdersLoading(false);
            }
        }

        fetchOrders();
    }, [])

    return <section className="p-1 flex flex-col gap-2 bg-gray-200">
        {ordersLoading
            ? <h2>Loading...</h2>
            : orders.map(data => {
                return <div key={data._id} className="rounded-md dark:bg-black bg-gray-100 overflow-hidden">
                    <OrderCard data={data} orderId={data._id} />
                </div>
            })}
    </section>
}

export default OrderMain