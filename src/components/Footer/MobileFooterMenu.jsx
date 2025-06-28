import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowBottomMenu, selectBottomMenu } from "../../features/home/homeSlice";

const MobileFooterMenu = () => {
    // const [show, setShow] = useState(true);
    const lastScrollTop = useRef(window.scrollY);
    const show = useSelector(selectBottomMenu);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.scrollY;

            if ((currentScrollTop > (lastScrollTop.current + 10))) {
                dispatch(setShowBottomMenu(false));
            } else if (currentScrollTop < (lastScrollTop.current - 10)) {
                dispatch(setShowBottomMenu(true));
            }

            lastScrollTop.current = currentScrollTop;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="flex md:hidden w-full items-center justify-around text-2xl text-black h-14 shadow-[0_0_20px_1px_rgba(0,0,0,0.3)] position fixed bottom-0 transform transition-transform duration-200 ease-linear bg-white z-30"
            style={{ transform: show ? "translateY(0)" : "translateY(100%)" }}
        >
            <button>
                <i className="fa-solid fa-handshake-angle"></i>
            </button>
            <button>
                <i className="ri-information-line"></i>
            </button>
            <button className="">
                <i className="ri-heart-2-fill text-red-600"></i>
            </button>
            <button>
                <i className="ri-handbag-line"></i>
            </button>
            <button>
                <i className="fa-solid fa-cart-shopping">
                    <sub className="text-xs -mt-4">
                        
                    </sub>
                </i>
            </button>
        </div>
    );
};

export default MobileFooterMenu;
