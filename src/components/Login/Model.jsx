import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EnteryDiv from "./EntryDiv";
import { 
        selectlogInModal, 
        closeLogInModal
    } from "../../features/Login/loginSlice";


const Model = () => { 
    const [member, setMember] = useState(true);
    const [phone, setPhone] = useState(false);
    const [signInPhone, setSignInPhone] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const inputRef = useRef(null);
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
            <div onClick={handleModelClick} className={`fixed top-0 right-0 h-screen w-[35%] bg-white z-50 flex items-start justify-center transform 
            ${isOpen ? "modal-slide-enter" : "modal-slide-exit"}`}>
                <div className="w-[80%] h-auto mt-7">
                    <button className="cursor-pointer mb-4" onClick={handleClose}><i className="ri-close-large-fill text-xl"></i></button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2>{member ? "Login" : "Sign up"}</h2>
                            <p className="font-semibold">or{" "}
                                <button className="text-primary cursor-pointer"onClick={handleSwitch}>
                                    {member ? "create an account" : "login to your account"}
                                </button>
                            </p>
                            <hr className="w-8 border-t-2 font-bold mt-6"/>
                        </div>
                        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" height="110px" width="110px" alt="Profile_dummy_image" />
                    </div>
                    <form onSubmit={handleSignIn} className={`mt-10 ${!member ? "hidden" : ""}`}>
                        {/* <div onClick={handleInputClick} className="relative p-2.5 border-2 border-gray-400 h-[70px] rounded-lg cursor-text">
                            <p className={`absolute font-bold ${hasValue ? "text-red-500" : "text-gray-500"} transition-all duration-300 ${phone ? "top-2.5 text-xs" : "top-[19px] text-lg"}`}>{hasValue ? "Enter your phone number" : "Phone number"}</p>
                            <input ref={inputRef} onChange={handleInput} className="relative top-5 font-bold text-lg outline-none" type="tel" />
                        </div> */}
                        <EnteryDiv 
                            handleDivClick={handleInputClick} 
                            hasValue={hasValue} 
                            inputRef={inputRef} 
                            handleInput={handleInput} 
                            placeholder="Phone number" 
                            fallbackPlacehoder="Enter your phone number" 
                            focus={phone}
                        />
                        
                        <button className="bg-primary font-bold text-white w-full h-11 mt-5 rounded-lg cursor-pointer">LOGIN</button>
                        <button className="font-bold text-[#6e6e6e] w-full h-11 mt-2 rounded-lg cursor-pointer hover:text-primary">Login as Guest</button>

                        <p className="text-xs font-semibold text-gray-800 mt-1 text-center">
                            By clicking on Login, I accept the 
                            <NavLink className="font-bold text-black"> Terms & Conditions & Privacy Policy</NavLink>
                        </p>
                    </form>
                    <form onSubmit={handleSignUp} className={`${member ? "hidden" : ""} mt-10`}>
                        {/* <EnteryDiv />
                        <EnteryDiv />
                        <EnteryDiv /> */}
                        <button className="bg-primary font-bold text-white w-full h-11 mt-5 rounded-lg cursor-pointer">CONTINUE</button>
                        <p className="text-xs font-semibold text-gray-800 mt-1 text-center">
                            By creating an account, I accept the 
                            <NavLink className="font-bold text-black">Terms & Conditions & Privacy Policy</NavLink>
                        </p>
                    </form>
                    <p className="absolute top-[93%] left-[50%] transform -translate-1/2 text-center text-lg font-semibold text-primary" style={{fontStyle: "italic"}}>Developed By Shivendra</p>
                </div>
            </div>
    );
}

export default Model;

// https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r