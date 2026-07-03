// Done
import { useEffect, useState } from 'react';
import { selectDeviceFingerPrint } from '../../features/home/homeSlice';
import { useSelector } from 'react-redux';
import OrderCard from './OrderCard';
import OrderShimmer from './OrderShimmer';

const OrderMain = () => {
  // console.log("Order/OrderMain rendered");
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const deviceId = useSelector(selectDeviceFingerPrint);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/userActivity/orders`,
          {
            method: 'GET',
            headers: {
              'x-identifier': import.meta.env.VITE_HASHED_IDENTIFIER,
              'Content-Type': 'application/json',
              'x-user-agent': navigator.userAgent,
              'x-language': navigator.language,
              'x-resolution': `${screen.height}x${screen.width}`,
              'x-device-id': deviceId,
            },
            credentials: 'include',
          },
        );

        const orders = await result.json();
        if (!result.ok) throw new Error(orders.message);

        setOrders(orders.data);
        setOrdersLoading(false);
      } catch (err) {
        console.log('Error in fetching orders', err);
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [deviceId]);

  return (
    <section className="flex flex-col gap-2 bg-gray-200 p-1">
      {ordersLoading ? (
        <OrderShimmer />
      ) : (
        orders.reverse().map((data) => {
          return (
            <div
              key={data._id}
              className="overflow-hidden rounded-md bg-gray-100 dark:bg-black"
            >
              <OrderCard data={data} orderId={data._id} />
            </div>
          );
        })
      )}
    </section>
  );
};

export default OrderMain;
