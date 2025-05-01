import { useState, useRef, useEffect } from "react";

const EntryDiv = ({
  type,
  inputMode,
  purpose,
  value,
  focus = false,
  onChangeHandler,
  placeholder,
  fallbackPlacehoder,
  isReadOnly = false,
  changeIsEntryMade,
  changeHasValue,
}) => {
  const [isEntryMade, setIsEntryMade] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (focus) {
      inputRef.current.focus();
      setIsEntryMade(true);
    }
  }, [focus]);

  useEffect(() => {
    if (changeHasValue !== undefined) setHasValue(changeHasValue);
    if (changeIsEntryMade !== undefined) setIsEntryMade(changeIsEntryMade);
  }, [changeHasValue, changeIsEntryMade]);

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

  const onNameBlur = () => {
    if (inputRef.current.value.length == 0) {
      setIsEntryMade(false);
      setHasValue(false);
    }
  };

  const onEmailBlur = () => {
    if (inputRef.current.value.length == 0) {
      setIsEntryMade(false);
      setHasValue(false);
    } else if (
      !/^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        inputRef.current.value
      )
    ) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  };

  const handlePhoneInput = (e) => {
    setHasValue(false);
    e.target.value = e.target.value.replace(/[^0-9]*/g, "");
    e.target.value = e.target.value.slice(0, 10);
  };

  const handleOtpInput = (e) => {
    setHasValue(false);
    e.target.value = e.target.value.replace(/[^0-9]*/g, "");
    e.target.value = e.target.value.slice(0, 6);
  };

  const handleGeneralInput = () => {
    setHasValue(false);
  };

  const handleFocus = () => {
    setIsEntryMade(true);
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
      : handleGeneralInput;

  return (
    <div
      // onBlur={()=> {console.log("Blured Div")}}
      onClick={handleDivClick}
      className="relative p-2.5 border-2 border-gray-300 h-[70px] cursor-text"
    >
      <p
        className={`absolute font-semibold ${
          hasValue ? "text-red-500" : "text-gray-400"
        } transition-all duration-[250ms] ease-in-out ${
          isEntryMade ? "top-2.5 text-xs" : "top-[19px] text-lg"
        }`}
      >
        {hasValue ? fallbackPlacehoder : placeholder}
      </p>
      <input
        id="elem"
        name={purpose}
        // value={value}
        type={type}
        onBlur={handleBlur}
        onFocus={handleFocus}
        inputMode={inputMode}
        readOnly={isReadOnly}
        ref={inputRef}
        onChange={(event) => {
          handleInput(event);
          // onChangeHandler(event);
        }}
        className="relative top-5 font-bold text-lg outline-none "
      />
    </div>
  );
};

export default EntryDiv;
