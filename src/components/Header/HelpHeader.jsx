import MainHeader from "./MainHeader";
import HeaderWrapper from "./HeaderWrapper";
import useScrollToTop from "./../../utils/useScrollToTop";

const HelpHeader = () => {
    useScrollToTop();
    
    return <HeaderWrapper>
        <MainHeader searchPlaceholder="HELP & SUPPORT" />
    </HeaderWrapper>
}

export default HelpHeader;

