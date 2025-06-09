import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { setContact, setFaqs } from "../../features/home/helpPageSlice";

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
        <div className="basis-[25%] bg-gray-200 py-6 pl-6">
            {menu.map((item, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        className="group flex items-center justify-center py-6 cursor-pointer"
                        style={{
                            backgroundColor: activeIndex === index ? "white" : "transparent",
                            color: activeIndex === index ? "black" : "#4a5565"
                        }}
                    >
                        <p className="font-bold group-hover:text-black select-none">
                            {item}
                        </p>
                    </div>
                );
            })}
        </div>
    );
});

export default MenuBar;
