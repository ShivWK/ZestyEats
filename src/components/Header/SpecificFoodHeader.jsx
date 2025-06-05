import HeaderWrapper from "./HeaderWrapper";
import MainHeader from "./MainHeader";
import { selectFoodCategory } from "../../features/header/headerSlice";
import { useSelector } from "react-redux";

const SpecificFoodHeader = () => {
    const category = useSelector(selectFoodCategory);
    console.log(category);

    return (<HeaderWrapper>
        <MainHeader searchPlaceholder={category} />
    </HeaderWrapper>)
}

export default SpecificFoodHeader;