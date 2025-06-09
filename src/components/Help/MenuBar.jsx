import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { setContact, setFaqs } from "../../features/home/helpPageSlice";
import LeftMenu from "./LeftMenu";

const MenuBar = memo(() => {
  const menu = ["Contact Us", "FAQs", "Legal"];
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();

  const handleClick = (index) => {
    setActiveIndex(index);
    if (index === 0) {
      dispatch(setContact(true));
      dispatch(setFaqs(false));
    } else if (index === 1) {
      dispatch(setFaqs(true));
      dispatch(setContact(false));
    } else {
      dispatch(setFaqs(false));
      dispatch(setContact(false));
    }
  };

  return (
    <LeftMenu
      data={menu}
      clickHandler={handleClick}
      width={"25%"}
      currentIndex={activeIndex}
    />
  );
});

export default MenuBar;
