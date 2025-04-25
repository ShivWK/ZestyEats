import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
        selectlogInModal, 
        closeLogInModal
    } from "../../features/Login/loginSlice";


const Model = () => { 
    const [member, setMember] = useState(true);
    const [phone, setPhone] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const inputRef = useRef(null);
    const [placeholder, setPlaceholder] = useState("Phone Number");
    const isOpen = useSelector(selectlogInModal)
    const dispatch = useDispatch();

    const handleSwitch = () => {
        setMember(!member)
    }
    
    const handleSignIn = (e) => {
        e.preventDefault();
        console.log("Sign In");
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log("Sign Up");
    }

    const handleClose = () => {
        dispatch(closeLogInModal());
    }

    const handleInputClick = (e) => {
        e.stopPropagation();
        setPhone(true);
        inputRef.current.focus();
    }

    const handleModelClick = () => {
        if (inputRef.current.value.length > 0) {
            setHasValue(true);
        } else {
            setHasValue(false);
            setPhone(false)
        }
    }

    console.log(phone, hasValue);

    const handleInput = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]*/g, "")
    }

    return (
            <div onClick={handleModelClick} className={`fixed top-0 right-0 h-screen w-[35%] bg-white z-50 flex items-start justify-center transition-all duration-300
            smooth ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="w-[80%] h-auto mt-7">
                    <button className="cursor-pointer mb-4" onClick={handleClose}><i className="ri-close-large-fill text-xl"></i></button>
                    <h2>{member ? "Login" : "Sign up"}</h2>
                    <p className="font-semibold">or{" "}
                        <button className="text-primary"onClick={handleSwitch}>
                            {member ? "create an account" : "login to your account"}
                        </button>
                    </p>
                    <hr className="w-8 border-t-2 font-bold mt-6"/>
                    <form onSubmit={handleSignIn} className={`mt-8 ${!member ? "hidden" : ""}`}>
                        <div onClick={handleInputClick} className="relative p-2.5 border-2 border-gray-400 h-[70px] rounded-lg cursor-text">
                            <p className={`absolute font-bold ${hasValue ? "text-red-500" : "text-gray-500"} transition-all duration-300 ${phone ? "top-2.5 text-xs" : "top-[19px] text-lg"}`}>{hasValue ? "Enter your phone number" : "Phone number"}</p>
                            <input ref={inputRef}  onChange={handleInput} className="relative top-5 font-bold text-lg outline-none" type="tel" />
                        </div>
                        <button className="bg-primary font-bold text-white w-full h-11 mt-5 rounded-lg">LOGIN</button>
                        <p className="text-xs font-semibold text-gray-800 mt-1">
                            By clicking on Login, I accept the 
                            <NavLink className="font-bold text-black"> Terms & Conditions & Privacy Policy</NavLink>
                        </p>
                    </form>
                    <form onSubmit={handleSignUp} className={member ? "hidden" : ""}>
                        <input type="tel" placeholder="Phone Number" />
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <button>CONTINUE</button>
                        <p className="text-xs font-semibold text-gray-800 mt-1">
                            By creating an account, I accept the 
                            <NavLink className="font-bold text-black">Terms & Conditions & Privacy Policy</NavLink>
                        </p>
                    </form>
                </div>
            </div>
    );
}

export default Model;

// https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r