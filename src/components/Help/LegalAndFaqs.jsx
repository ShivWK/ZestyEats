import { useState, memo } from "react";

const LegalAndFaqs = memo(() => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index) => {
        if (activeIndex === null) {
            setActiveIndex(index);
        } else if(activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    }

    const data = [
        {
            title: "How do I place an order?",
            description:
                "To place an order, simply browse through nearby restaurants on your homepage. Use filters to sort by rating, cuisine, or delivery time. Once you find a restaurant, tap to open the menu, add desired items to your cart, and proceed to checkout. Choose your preferred payment option (UPI, card, or COD) and place the order. You'll receive a confirmation and can track the order in real-time.",
        },
        {
            title: "How do I track my order?",
            description:
                "To place an order, simply browse through nearby restaurants on your homepage. Use filters to sort by rating, cuisine, or delivery time. Once you find a restaurant, tap to open the menu, add desired items to your cart, and proceed to checkout. Choose your preferred payment option (UPI, card, or COD) and place the order. You'll receive a confirmation and can track the order in real-time.",
        },
        {
            title: "Can I change or cancel my order?",
            description:
                "To place an order, simply browse through nearby restaurants on your homepage. Use filters to sort by rating, cuisine, or delivery time. Once you find a restaurant, tap to open the menu, add desired items to your cart, and proceed to checkout. Choose your preferred payment option (UPI, card, or COD) and place the order. You'll receive a confirmation and can track the order in real-time.",
        },
        {
            title: "What should I do if my food is delayed?",
            description:
                "To place an order, simply browse through nearby restaurants on your homepage. Use filters to sort by rating, cuisine, or delivery time. Once you find a restaurant, tap to open the menu, add desired items to your cart, and proceed to checkout. Choose your preferred payment option (UPI, card, or COD) and place the order. You'll receive a confirmation and can track the order in real-time.",
        },
    ];

    return (<div className="basis-[75%] pl-7 py-7">
        <p className="text-[25px] font-bold text-black tracking-tight mb-4 ">Heading</p>
        {data.map((obj, index) => {
            return (
                <div key={index} className="border-b-2 border-gray-300">
                    <div onClick={() => handleClick(index)} className="group flex justify-between items-center py-3 px-2 cursor-pointer" style={{
                        backgroundColor: activeIndex === index ? "rgba(255,81,0,0.15)" : "white"
                    }}>
                        <p className="group-hover:text-primary text-[18px] font-semibold transition-all duration-150 ease-in select-none">{obj.title}</p>
                        <i
                            className="ri-arrow-drop-down-line text-[#ff5200] text-4xl font-[200] -ml-2.5 inline-block"
                            style={{
                                transform: activeIndex === index ? "rotate(-180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s linear",
                            }}
                        ></i>
                    </div>
                    <div
                        className="p-3 py-5"
                        style={{
                            display: activeIndex === index ? "block" : "none",
                        }}
                    >
                        <p className="text-gray-700 font-semibold">{obj.description}</p>
                    </div>
                </div>
            );
        })}
    </div>)
});

export default LegalAndFaqs;