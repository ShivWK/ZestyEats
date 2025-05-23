import { useNavigationType } from "react-router-dom";
import { useEffect } from "react";

const useScrollToTop = () => {
    const Type = useNavigationType(); // POP PUSH REPLACE

    useEffect(() => {
        if (Type === "PUSH") {
            window.scrollTo(0, 0);
        }
    }, [Type]);
};

export default useScrollToTop;