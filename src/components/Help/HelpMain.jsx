import MenuBar from "./MenuBar";
import ContentArea from "./ContentArea";
import BodyComponent from "./BodyComponent";
import MobileFooterMenu from "../Footer/MobileFooterMenu";
// 
// 
const HelpMain = () => {
    return <>
        <BodyComponent heading={"Help & Support"} description={"Let's take a step ahead and help you better."}>
            <MenuBar />
            <ContentArea />
        </BodyComponent>
        <MobileFooterMenu />
    </>
}

export default HelpMain;