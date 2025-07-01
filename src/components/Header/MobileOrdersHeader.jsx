import HeaderWrapper from "./HeaderWrapper";
import MainHeader from "./MainHeader";

const MobileOrdersHeader = () => {
    return <HeaderWrapper>
        <MainHeader searchPlaceholder="Orders & Wishlist" showSearch={false} />
    </HeaderWrapper>
}

export default MobileOrdersHeader;