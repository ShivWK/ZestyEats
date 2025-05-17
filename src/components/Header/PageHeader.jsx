import MainHeader from "./MainHeader";
import { selectLocationModal, selectlogInModal } from "../../features/Login/loginSlice";
import { useSelector } from "react-redux";

export default function PageHeader() {
  const isLoginOpen = useSelector(selectlogInModal);
  const isLocationOpen = useSelector(selectLocationModal);

  return (
    <div className="w-full shadow-[0_0_20px_1px_rgb(0,0,0,0.3)] h-20 fixed z-30 bg-white"
      style={{paddingRight: (isLocationOpen || isLoginOpen) ? 15 : 0}}
    >
      <MainHeader />
    </div>
  );
}
