import { Outlet } from "react-router-dom";
import PageHeader from "./Header/PageHeader";
import PageFooter from "./Footer/PageFooter";
import LoginModal from "./Login/LoginModal";
import LocationModal from "./Location/LocationModal";
import { selectlogInModal, selectLocationModal } from "../features/Login/loginSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Layout() {
    const isLoginOpen = useSelector(selectlogInModal);
    const isLocationOpen = useSelector(selectLocationModal);

    useEffect(() => {
        const scrollbarWidth = "15px";   

        if (isLoginOpen || isLocationOpen) {
                document.body.classList.add('overflow-hidden');
                document.body.style.paddingRight = scrollbarWidth;
              } else {
                document.body.classList.remove('overflow-hidden');
                document.body.style.paddingRight = "0px";
              }
        // Hard coded for now, but we can use a library to get the scrollbar width dynamically.
            return () => {
                document.body.classList.remove('overflow-hidden');
                document.body.style.paddingRight = "0px";
            }
    }, [isLoginOpen, isLocationOpen])
     
    return <>
        <PageHeader />
        <Outlet/>
        {isLoginOpen && <LoginModal />}
        {isLocationOpen && <LocationModal />}
        {/* <PageFooter /> */}
    </>
}