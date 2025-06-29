import { useEffect, useRef, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowBottomMenu, selectBottomMenu } from "../../features/home/homeSlice";
import { NavLink } from "react-router-dom";

const MobileFooterMenu = memo(() => {
    const [showOnMobile, setShowOnMobile] = useState(false);
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

        const handleResize = () => {
            if (window.innerWidth < 768) {
                setShowOnMobile(true);
            } else {
                setShowOnMobile(false);
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return ( showOnMobile &&
        <div
            className="flex left-0 right-0 w-full items-center justify-around text-2xl text-black h-14 shadow-[0_0_20px_1px_rgba(0,0,0,0.3)] position fixed bottom-0 transform transition-transform duration-200 ease-linear bg-white z-30"
            style={{ transform: show ? "translateY(0)" : "translateY(100%)" }}
        >
            <NavLink to={"/support?mode=help"} style={({isActive}) =>{ if (isActive) return { color: "#ff5200"}}}>
                <i className="fa-solid fa-handshake-angle"></i>
            </NavLink>
            <NavLink to={"/mbAbout?mode=about"} style={({isActive}) =>{ if (isActive) return { color: "#ff5200"}}}>
                <i className="ri-information-line"></i>
            </NavLink>
            <NavLink to={"/profile"} style={({isActive}) =>{ if (isActive) return { color: "#ff5200"}}}>
                <i className="ri-heart-2-fill text-red-600"></i>
            </NavLink>
            <NavLink to={"/profile"} style={({isActive}) =>{ if (isActive) return { color: "#ff5200"}}}>
                <i className="ri-handbag-line"></i>
            </NavLink>
            <NavLink to={"/cart"} style={({isActive}) =>{ if (isActive) return { color: "#ff5200"}}}>
                <i className="fa-solid fa-cart-shopping">
                    <sub className="text-xs -mt-4 text-red-500">
                        
                    </sub>
                </i>
            </NavLink>
        </div>
    );
});

export default MobileFooterMenu;
