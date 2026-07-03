// Done
import { FileText } from 'lucide-react';

const BillingCard = ({ data }) => {
  // console.log("BillingCard rendered");
  const mainData = data.billing;

  const billArr = [
    {
      text: 'Item Total',
      amount: mainData.itemsTotal,
    },

    {
      text: 'GST & restaurant packaging',
      amount: +mainData.GST.toFixed(2) + mainData.packaging,
    },

    {
      text: 'Delivery fee',
      amount: mainData.deliveryFee,
    },

    {
      text: 'Platform fee',
      amount: mainData.platformFee,
    },

    {
      text: 'Cash handling fee',
      amount: mainData.cashHandlingFee,
    },

    {
      text: 'Grand Total',
      amount: mainData.grandTotal,
    },
  ];

  return (
    <section>
      <div className="flex items-center gap-1">
        <FileText size={18} strokeWidth={2} />
        <h2 className="text-lg">Bill Summary</h2>
      </div>

      <div className="mt-4">
        {billArr.map((data) => {
          return (
            <div
              className={`flex items-center justify-between text-sm text-gray-600 ${data.text === 'Grand Total' && 'mt-1 border-t-[1px] border-dashed pt-1'}`}
            >
              <p>{data.text}</p>
              <span className="font-semibold text-black">{`₹${data.amount}`}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BillingCard;
