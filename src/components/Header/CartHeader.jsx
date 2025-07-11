import MainHeader from "./MainHeader";
import HeaderWrapper from "./HeaderWrapper";

const CartHeader = () => {
  return (
    <HeaderWrapper>
      <MainHeader
        searchPlaceholder="Secure Checkout"
        showAbout={false}
        showSearch={false}
        showCart={false}
        showOffers={false}
      />
    </HeaderWrapper>
  );
};

export default CartHeader;
