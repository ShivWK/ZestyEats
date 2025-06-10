import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import PageHeader from "./Header/PageHeader";
import PageFooter from "./Footer/PageFooter";
// import LoginModal from "./Login/LoginModal";
const LoginModal = lazy(() => import("./Login/LoginModal"));
const LocationModal = lazy(() => import("./Location/LocationModal"));
// import LocationModal from "./Location/LocationModal";
import { toast } from "react-toastify";
import {
  selectlogInModal,
  selectLocationModal,
  selectHoverState,
} from "../features/Login/loginSlice";
import { setOnline } from "../features/home/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Layout() {
  const isLoginOpen = useSelector(selectlogInModal);
  const isLocationOpen = useSelector(selectLocationModal);
  const { loginHovered, locationHovered } = useSelector(selectHoverState);
  const dispatch = useDispatch();

  console.log("location:", locationHovered, "Login:", loginHovered)

  useEffect(() => {
    console.log("Called")
    if (locationHovered) {
      import("./Location/LocationModal")
    } else if (loginHovered) {
      import("./Login/LoginModal");
    }
  }, [loginHovered, locationHovered])

  useEffect(() => {
    const scrollbarWidth = "15px";

    if (isLoginOpen || isLocationOpen) {
      document.body.classList.add("overflow-hidden");
      document.body.style.paddingRight = scrollbarWidth;
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "0px";
    }
    // Hard coded for now, but we can use a library to get the scrollbar width dynamically.
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "0px";
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
