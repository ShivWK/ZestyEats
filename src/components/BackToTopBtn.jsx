import { useEffect, useState } from "react";

const BackToTopBtn = () => {
    const [showBtn, setShowBtn] = useState(false);

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

    return <button onClick={clickHandler} className={`fixed left-1/2 -translate-x-1/2 bottom-5 bg-[rgba(0,0,0,0.7)] text-white py-1.5 px-2 rounded-md text-sm cursor-pointer transform transition-transform duration-100 ease-in ${showBtn ? "translate-y-o" : "translate-y-[200%]"} `}>Back to top</button>
}

export default BackToTopBtn