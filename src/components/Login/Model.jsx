import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
        selectlogInModal, 
        closeLogInModal
    } from "../../features/Login/loginSlice";


const Model = () => { 
    const [member, setMember] = useState(true);
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
        dispatch(closeLogInModal);
    }

    return (
        <div className={`model ${isOpen ? "-translate-x-[30%]" : "translate-x-[30%]"}`}>
            <button onClick={handleClose}><i class="ri-close-large-fill"></i></button>
            <h2>{member ? "Login" : "Sign up"}</h2>
            <p>or 
                <button className="text-primary"onClick={handleSwitch}>
                    {member ? "create an account" : "login to your account"}
                </button>
            </p>
            <hr className="w-2 font-bold"/>
            <form onSubmit={handleSignIn} className={`{!member ? "hidden" : ""}`}>
                <input  type="tel" placeholder="Phone Number" />
                <button>LOGIN</button>
                <p>
                    By clicking on Login, I accept the 
                    <NavLink className="font-bold">Terms & Conditions & Privacy Policy</NavLink>
                </p>
            </form>
            <form onSubmit={handleSignUp} className={`{member ? "hidden" : ""}`}>
                <input type="tel" placeholder="Phone Number" />
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <button>CONTINUE</button>
                <p>
                    By creating an account, I accept the 
                    <NavLink className="font-bold">Terms & Conditions & Privacy Policy</NavLink>
                </p>
            </form>
        </div>
    );
}

export default Model;