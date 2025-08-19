function calBilling({ dispatch, cartItems, setItemsTotalCost, setGSTAndOtherCharges, setPayableAmount }) {
    const platformFee = 5;
    const packaging = 35;
    
    const total = cartItems.reduce((acc, { item, quantity }) => {
      const defaultPrice = item?.price / 100 || item?.defaultPrice / 100 || 0;
      const finalPrice = item?.finalPrice / 100;
      let price = +(finalPrice || defaultPrice).toFixed(2);

      return acc + quantity * price;
    }, 0).toFixed(2);

    const gst = total * 0.05;
    const gstAndOtherCharges = (gst + platformFee + packaging).toFixed(2);
    const totalPayableAmount = +total + +gstAndOtherCharges;

    dispatch(setItemsTotalCost(total));
    dispatch(setGSTAndOtherCharges(gstAndOtherCharges));
    dispatch(setPayableAmount({ mode: "initial", cost : +totalPayableAmount.toFixed(2) }));

    return +gst.toFixed(2);
}

export default calBilling;