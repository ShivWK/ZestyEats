import BodyComponent from "../Help/BodyComponent";
import LeftMenu from "../Help/LeftMenu";
import RightContent from "./RightContwnt";
import { aboutHeadings, about } from "../../utils/aboutPageData";
import { useState } from "react";
import MobileFooterMenu from "../Footer/MobileFooterMenu";

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ About, purpose, core_features, performance, security, tech_stack, user_role, learnings ] = about;
  const [dataToSend, setDataToSend] = useState(About)

  const handleClick = (index) => {
    setActiveIndex(index);

    if (index === 0 ) {
        setDataToSend(About);
    } else if (index == 1) {
        setDataToSend(purpose);
    } else if (index === 2) {
        setDataToSend(core_features);
    } else if (index === 3) {
        setDataToSend(performance);
    } else if (index === 4) {
        setDataToSend(security);
    } else if (index === 5) {
        setDataToSend(tech_stack);
    } else if (index === 6) {
        setDataToSend(user_role);
    } else {
        setDataToSend(learnings)
    }
  };

  return (
    <>
    <BodyComponent
      heading={"About"}
      description={
        "ZestyEats is a modern full-stack food delivery app built with the MERN stack, focused on performance, security, and real-world user experience."
      }
    >
      <LeftMenu
        data={aboutHeadings}
        currentIndex={activeIndex}
        clickHandler={handleClick}
        width={"26%"}
      />
      <RightContent data={dataToSend} />
    </BodyComponent>
    <MobileFooterMenu />
    </>
  );
};

export default About;
