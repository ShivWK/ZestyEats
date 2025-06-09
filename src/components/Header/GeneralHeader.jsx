import MainHeader from "./MainHeader";
import HeaderWrapper from "./HeaderWrapper";
import useScrollToTop from "../../utils/useScrollToTop";

const GeneralHeader = ({ placeholder }) => {
    useScrollToTop();
    
    return <HeaderWrapper>
        <MainHeader searchPlaceholder={placeholder} />
    </HeaderWrapper>
}

export default GeneralHeader;

