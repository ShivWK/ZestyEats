import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { selectBottomMenu } from "../features/home/homeSlice";
import { useSelector } from "react-redux";
import { selectLogInModal, selectLocationModal } from "../features/Login/loginSlice";
import { selectMenuModel } from "../features/home/restaurantsSlice";

const BackToTopBtn = ({ extraMargin = false }) => {
    const [showBtn, setShowBtn] = useState(false);
    const pathname = useLocation().pathname;
    const isLoginOpen = useSelector(selectLogInModal);
    const isLocationOpen = useSelector(selectLocationModal);
    const menuModel = useSelector(selectMenuModel);

    const clickHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        const scrollHandler = () => {
            const HTML = document.documentElement;
            const windowScrollTop = HTML.scrollTop;

            const hasScrolledALot = windowScrollTop >= Math.max(HTML.clientHeight * 2.2, 500);

            if (hasScrolledALot) setShowBtn(true);
            else setShowBtn(false)
        }

        window.addEventListener("scroll", scrollHandler)
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [])

    return <button onClick={clickHandler} className={`fixed flex items-center justify-center gap-1 left-1/2 -translate-x-1/2 bottom-5 bg-[rgba(0,0,0,0.6)] text-white py-1.5 px-2 rounded-md text-sm cursor-pointer transform transition-all duration-150 ease-linear font-semibold ${(isLocationOpen || isLoginOpen || menuModel) && "hidden"} ${extraMargin && "max-md:mb-12"} ${showBtn ? "translate-y-o" : "translate-y-[500%]"}`}>
        <i className="ri-arrow-up-circle-line font-extralight text-xl"></i>
        <p>Back to top</p>
        </button>
}

export default BackToTopBtn