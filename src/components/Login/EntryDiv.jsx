import { useState, useRef, useEffect } from "react";

const EnteryDiv = ({
  type,
  inputMode,
  purpose,
  handleFocus,
  placeholder,
  fallbackPlacehoder,
  isReadOnly = false,
  changeIsEntryMade,
  changeHasValue
}) => {
  const [isEntryMade, setIsEntryMade] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef(null);

  useEffect(()=> {
    if (changeHasValue) setHasValue(true);
    if (changeIsEntryMade) setIsEntryMade(false);
  }, [changeHasValue, changeIsEntryMade])

  const handleDivClick = (e) => {
    e.stopPropagation();
    setIsEntryMade(true);
    inputRef.current.focus();
  };

  const onPhoneBlur = () => {
    if (
      inputRef.current.value.length > 0 &&
      inputRef.current.value.length < 10
    ) {
      // check if the phone number is valid
      setHasValue(true);
    } else if (inputRef.current.value.length == 0) {
      setHasValue(false);
      setIsEntryMade(false);
    }
  };

  const onOtpBlur = () => {
    if (
      inputRef.current.value.length > 0 &&
      inputRef.current.value.length < 6
    ) {
      setHasValue(true);
    } else if (inputRef.current.value.length == 0) {
      setHasValue(false);
      setIsEntryMade(false);
    } 
  };

  const onNameBlur = () => {};

  const onEmailBlur = () => {};

   // Handle the input event on phone and otp to check if the input is empty or not
  const handlePhoneInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]*/g, "");
    e.target.value = e.target.value.slice(0, 10);
  };

  const handleOtpInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]*/g, "");
    e.target.value = e.target.value.slice(0, 6);
  };

  const handleBlur =
    purpose == "phone"
      ? onPhoneBlur
      : purpose == "otp"
      ? onOtpBlur
      : purpose == "name"
      ? onNameBlur
      : onEmailBlur;

  const handleInput =
    purpose == "phone"
      ? handlePhoneInput
      : purpose == "otp"
      ? handleOtpInput
      : null;

  return (
    <div
      onClick={handleDivClick}
      className="relative p-2.5 border-2 border-gray-400 h-[70px] cursor-text"
    >
      <p
        className={`absolute font-bold ${
          hasValue ? "text-red-500" : "text-gray-500"
        } transition-all duration-300 ${
          isEntryMade ? "top-2.5 text-xs" : "top-[19px] text-lg"
        }`}
      >
        {hasValue ? fallbackPlacehoder : placeholder}
      </p>
      <input
        name={purpose}
        onBlur={handleBlur}
        inputMode={inputMode}
        readOnly={isReadOnly}
        // onFocus={handleFocus}
        ref={inputRef}
        onChange={handleInput}
        className="relative top-5 font-bold text-lg outline-none bg-transparent"
        type={type}
      />
    </div>
  );
};

export default EnteryDiv;
