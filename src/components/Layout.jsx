import { Outlet } from "react-router-dom";
import PageHeader from "./Header/PageHeader";
import PageFooter from "./Footer/PageFooter";

export default function Layout() {
    return <>
        <PageHeader />
        <Outlet/>
        <PageFooter />
    </>
}