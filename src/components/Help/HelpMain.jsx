import MenuBar from "./MenuBar";
import ContentArea from "./ContentArea";
import BodyComponent from "./BodyComponent";
// 
// 
const HelpMain = () => {
    return <BodyComponent heading={"Help & Support"} description={"Let's take a step ahead and help you better."}>
        <MenuBar />
        <ContentArea />
    </BodyComponent>
}

export default HelpMain;