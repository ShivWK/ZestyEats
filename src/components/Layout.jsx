import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import PageHeader from "./Header/PageHeader";
import PageFooter from "./Footer/PageFooter";
const LoginModal = lazy(() => import("./Login/LoginModal"));
const LocationModal = lazy(() => import("./Location/LocationModal"));
import { toast } from "react-toastify";
import {
  selectLogInModal,
  selectLocationModal,
  selectHoverState,
} from "../features/Login/loginSlice";
import { setOnline } from "../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Layout() {
  const isLoginOpen = useSelector(selectLogInModal);
  const isLocationOpen = useSelector(selectLocationModal);
  const { loginHovered, locationHovered } = useSelector(selectHoverState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (locationHovered) {
      import("./Location/LocationModal")
    } else if (loginHovered) {
      import("./Login/LoginModal");
    }
  }, [loginHovered, locationHovered])

  useEffect(() => {
    const scrollbarWidth = "15px";

    const body = document.body;

    if (body.clientHeight >= body.scrollHeight) {
      body.style.paddingRight = "15px";
    }

    if (isLoginOpen || isLocationOpen) {
      body.classList.add("overflow-hidden");
      body.style.paddingRight = scrollbarWidth;
    } else {
      body.classList.remove("overflow-hidden");
      body.style.paddingRight = "0px";
    }
    // Hard coded for now, but we can use a library to get the scrollbar width dynamically.
    return () => {
      body.classList.remove("overflow-hidden");
      body.style.paddingRight = "0px";
    };
  }, [isLoginOpen, isLocationOpen]);

  useEffect(() => {
    const onlineHandler = () => {
      dispatch(setOnline(true));
      toast("Back Online", {
        autoClose: 2000, 
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          fontWeight: "bold",
          color: "white",
        },
        progressClassName: "progress-style",
      });
    };

    const offlineHandler = () => {
      dispatch(setOnline(false));
      toast("Lost Connection", {
        autoClose: 2000,
        style: {
          backgroundColor: "rgba(0,0,0,0.9)",
          fontWeight: "bold",
          color: "white",
        },
        // progressClassName: "progress-style"
      });
    };

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return (
    <>
      <PageHeader />
      <Outlet />
      {isLoginOpen && (
        <Suspense fallback={<p>Loading...</p>}>
          <LoginModal />
        </Suspense>
      )}
      {isLocationOpen && (
        <Suspense fallback={<p>Loading...</p>}>
          <LocationModal />
        </Suspense>
      )}
      <PageFooter />
    </>
  );
}
