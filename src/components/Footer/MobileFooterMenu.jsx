import { useEffect, useRef, useState } from "react";

const MobileFooterMenu = () => {
    const [show, setShow] = useState(true);
    const lastScrollTop = useRef(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.scrollY;

            if (currentScrollTop > lastScrollTop.current) {
                setShow(false);
            } else if (currentScrollTop < lastScrollTop.current) {
                setShow(true);
            }

            lastScrollTop.current = currentScrollTop;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="flex md:hidden w-full items-center justify-around text-2xl h-14 shadow-[0_0_14px_1px_rgba(0,0,0,0.5)] position fixed bottom-0 transform transition-transform duration-200 ease-linear bg-white"
            style={{ transform: show ? "translateY(0)" : "translateY(100%)" }}
        >
            <button>
                <i className="fa-solid fa-handshake-angle"></i>
            </button>
            <button>
                <i className="ri-information-line"></i>
            </button>
            <button className="">
                <i className="ri-heart-2-fill"></i>
            </button>
            <button>
                <i className="ri-handbag-line"></i>
            </button>
            <button>
                <i className="fa-solid fa-cart-shopping"></i>
            </button>
        </div>
    );
};

export default MobileFooterMenu;
