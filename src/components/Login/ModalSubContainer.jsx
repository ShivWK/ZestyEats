import { useDispatch } from "react-redux";
import { closeLogInModal, loginOtpNotSend } from "../../features/Login/loginSlice";

const ModalSubContainer = ({ children, member, handleSwitch, isOtpSend  }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeLogInModal());
        dispatch(loginOtpNotSend());
      };

    return (<div className="w-[80%] h-auto mt-7">
        <button className="cursor-pointer mb-4" onClick={handleClose}><i className="ri-close-large-fill text-xl"></i></button>
        <div className="flex items-center justify-between">
            <div>
                <h2>{member ? (isOtpSend ? "Enter OTP" : "Login") : "Sign up"}</h2>
                {
                    member 
                    ? (isOtpSend 
                    ? <p className="font-semibold">We've sent an OTP to your phone number</p> 
                    : <p className="font-semibold">or{" "} 
                    {/* beause JSX removes the white space between p and button so we have manually added it. */}
                        <button className="text-primary cursor-pointer" onClick={handleSwitch}>
                            create an account
                        </button>
                    </p>) 
                    : <p className="font-semibold">or{" "}
                        <button className="text-primary cursor-pointer" onClick={handleSwitch}>
                            login to your account
                        </button>
                    </p>
                }
                {member ? (isOtpSend ? "" : <hr className="w-8 border-t-2 font-bold mt-6"/>) : <hr className="w-8 border-t-2 font-bold mt-6"/>}
            </div>
            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" height="110px" width="110px" alt="Profile_dummy_image" />
        </div>
        {children}
        <p className="absolute top-[93%] left-[50%] transform -translate-1/2 text-center text-lg font-semibold text-primary" style={{fontStyle: "italic"}}>Developed By Shivendra</p>
    </div>)
}
// (isOtpSend ? "We've sent an OTP to your phone number" :

export default ModalSubContainer;
