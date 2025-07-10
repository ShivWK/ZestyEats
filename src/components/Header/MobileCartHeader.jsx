import HeaderWrapper from "./HeaderWrapper";
import MainHeader from "./MainHeader";

const MobileCartHeader= () => {
    return <HeaderWrapper>
        <MainHeader searchPlaceholder="Secure Checkout" showSearch={false} />
    </HeaderWrapper>
}

export default MobileCartHeader;