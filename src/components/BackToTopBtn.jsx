import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { selectBottomMenu } from "../features/home/homeSlice";
import { useSelector } from "react-redux";

const BackToTopBtn = () => {
    const [showBtn, setShowBtn] = useState(false);
    const pathname = useLocation().pathname;
    const bottomMenuUp = useSelector(selectBottomMenu);

    const clickHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        const scrollHandler = () => {
            const HTML = document.documentElement;
            const windowScrollableHeight = HTML.scrollHeight - HTML.clientHeight;
            const windowScrollTop = HTML.scrollTop;

            const hasScrolledALot = windowScrollTop >= (20/100) * windowScrollableHeight;

            if (hasScrolledALot) setShowBtn(true);
            else setShowBtn(false)
        }

        window.addEventListener("scroll", scrollHandler)
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [])

    return <button onClick={clickHandler} className={`fixed flex gap-1 left-1/2 -translate-x-1/2 bottom-5 bg-[rgba(0,0,0,0.6)] text-white py-1.5 px-2 rounded-md text-sm cursor-pointer transform transition-all duration-100 ease-linear font-semibold ${(bottomMenuUp && pathname === "/") && "mb-12"} ${showBtn ? "translate-y-o" : "translate-y-[200%]"}`}>
        <i className="ri-arrow-up-circle-line font-light"></i>
        <p>Back to top</p>
        </button>
}

export default BackToTopBtn