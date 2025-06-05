import HeaderWrapper from "./HeaderWrapper";
import MainHeader from "./MainHeader";
import { selectFoodCategory } from "../../features/header/headerSlice";
import { useSelector } from "react-redux";

const SpecificFoodHeader = () => {
    const category = useSelector(selectFoodCategory);

    return (<HeaderWrapper>
        <MainHeader searchPlaceholder={category} />
    </HeaderWrapper>)
}

export default SpecificFoodHeader;