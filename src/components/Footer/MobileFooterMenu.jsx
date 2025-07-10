import { useEffect, useRef, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowBottomMenu, selectBottomMenu } from "../../features/home/homeSlice";
import { NavLink } from "react-router-dom";
import { selectCart } from "../../features/home/restaurantsSlice";

const MobileFooterMenu = memo(() => {
    const [showOnMobile, setShowOnMobile] = useState(false);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const lastScrollTop = useRef(window.scrollY);
    const show = useSelector(selectBottomMenu);
    const cart = useSelector(selectCart);
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

    useEffect(() => {
        const values = Object.values(cart);
        let count = 0;

        values.forEach(value => {
            count += value.quantity;
        })

        setCartItemsCount(count);
    }, [cart])

    return (showOnMobile &&
        <div
            className="flex left-0 right-0 w-full items-center justify-around text-2xl text-black h-14 shadow-[0_0_20px_1px_rgba(0,0,0,0.3)] position fixed bottom-0 transform transition-transform duration-200 ease-linear bg-white z-30"
            style={{ transform: show ? "translateY(0)" : "translateY(100%)" }}
        >
            <NavLink to={"/support?mode=help"} style={({ isActive }) => { if (isActive) return { color: "#ff5200" } }}>
                <i className="fa-solid fa-handshake-angle"></i>
            </NavLink>
            <NavLink to={"/mbAbout?mode=about"} style={({ isActive }) => { if (isActive) return { color: "#ff5200" } }}>
                <i className="ri-information-line "></i>
            </NavLink>

            <NavLink to={"/"} style={({ isActive }) => { if (isActive) return { color: "#ff5200" } }}>
                <i className="ri-home-8-fill text-3xl"></i>
            </NavLink>
            <NavLink to={"/ordersAndWishlist"} style={({ isActive }) => { if (isActive) return { color: "#ff5200" } }}>
                <i className="ri-handbag-line"></i>
            </NavLink>

            <NavLink to={"/cart"} style={({ isActive }) => { if (isActive) return { color: "#ff5200" } }}>
                <i className={`fa-solid fa-cart-shopping ${cartItemsCount && "cart-animation"}`}>
                    <sub className="text-[10px] text-red-600 ">
                            {cartItemsCount !== 0 && cartItemsCount}  
                    </sub>
                </i>
            </NavLink>
        </div>
    );
});

export default MobileFooterMenu;
