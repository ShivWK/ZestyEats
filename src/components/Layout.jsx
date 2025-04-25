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
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => document.body.style.overflow = "auto";
    }, [isOpen])
     
    return <>
        <PageHeader />
        <Outlet/>
        {isOpen && <LoginModel />}
        {/* <PageFooter /> */}
    </>
}