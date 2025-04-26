import { Outlet } from "react-router-dom";
import PageHeader from "./Header/PageHeader";
import PageFooter from "./Footer/PageFooter";
import LoginModel from "./Login/LoginModel";
import { selectlogInModal } from "../features/Login/loginSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Layout() {
    const isOpen = useSelector(selectlogInModal);

    useEffect(() => {
        const scrollbarWidth = "15px";   

        if (isOpen) {
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
    }, [isOpen])
     
    return <>
        <PageHeader />
        <Outlet/>
        {isOpen && <LoginModel />}
        {/* <PageFooter /> */}
    </>
}