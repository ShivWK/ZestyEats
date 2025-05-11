import Header from "./Header";
import { motion, useScroll } from "motion/react";
import { selectLocationModal, selectlogInModal } from "../../features/Login/loginSlice";
import { useSelector } from "react-redux";

export default function PageHeader() {
  const { scrollYProgress } = useScroll();
  const isLoginOpen = useSelector(selectlogInModal);
  const isLocationOpen = useSelector(selectLocationModal);

  return (
    <div className="w-full shadow-[0_0_20px_1px_rgb(0,0,0,0.3)] h-20 fixed z-30 bg-white"
      style={{paddingRight: (isLocationOpen || isLoginOpen) ? 15 : 0}}
    >
      <Header />
      {/* <motion.div
        className="fixed bottom-0 left-0 h-3 bg-primary w-2.5"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "left",
        }}
      /> */}
    </div>
  );
}
