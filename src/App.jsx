import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import { Bounce, ToastContainer } from "react-toastify";
import CloseToastBtn from "./components/CloseToastBtn";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        draggable
        theme="dark"
        transition={Bounce}
        icon={false}
        closeButton={CloseToastBtn}
        toastClassName={() => "flex items-center gap-4 rounded-lg shadow-xl px-4 py-3 mt-2"}
      />
    </>
  );
}
