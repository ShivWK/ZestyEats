import { useSelector } from "react-redux";
import { selectContact } from "../../features/home/helpPageSlice";
import Contact from "./Contact";
import LegalAndFaqs from "./LegalAndFaqs";

const ContentArea = () => {
    const contact = useSelector(selectContact);

    return (
        contact ?
            (<Contact />)
            : (<LegalAndFaqs />)
    );
};

export default ContentArea;
