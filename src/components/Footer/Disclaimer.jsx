import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Disclaimer = () => {
    const [isSmall, setIsSmall] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsSmall(true);
            } else {
                setIsSmall(false);
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return <div className="bg-red-200 w-full mt-4 pb-20">
        <diV className=" p-2 md:mx-auto w-full md:max-w-[1210px]">
            <div className="flex items-center gap-2 mb-2">
                <i className="fa-solid fa-triangle-exclamation text-xl text-red-500"></i>
                <p className="text-xl font-semibold">Educational Use Disclaimer</p>
            </div>
            <p className="text-justify font-sans">This project is for learning and demo purposes only. It does not represent or affiliate with any real-world brand. No commercial use intended. If you have concerns, please <Link to={isSmall ? "/support?mode=help" : "/help"} className="underline text-blue-600 font-semibold">contact</Link> for prompt removal.</p>
        </diV>
    </div>
}

export default Disclaimer;
