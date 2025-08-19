function calFinalPrice({ item, quantity }) {
    const defaultPrice = quantity * item?.price / 100 || quantity * item?.defaultPrice / 100 || 0;
    const finalPrice = quantity * item?.finalPrice / 100;
    const price = finalPrice ? finalPrice : defaultPrice;

    return price;
}

export default calFinalPrice;