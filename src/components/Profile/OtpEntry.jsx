import { useState, useRef, useEffect } from "react";

const OtpEntry = ({ count, verify = false, setOtp }) => {
    const inputBoxCount = Array.from({ length: count }, (_, i) => "");
    const [ inputValue, setInputValue ] = useState(inputBoxCount);
    const inputRef= useRef([]);

    useEffect(() => {
        setOtp(inputValue.join(""));
    }, [inputValue])
    
    const inputClickHandler = (e) => {
        e.stopPropagation();
    }

    const inputChangeHandler = (e, i) => {
        if (isNaN(e.target.value)) return
        const value = e.target.value.slice(-1);

        setInputValue(prv => {
            const newArr = [...prv];
            newArr[i] = value;

            return newArr;
        })

        if (value && i < count - 1) {
            inputRef.current[i + 1].focus();
        }
    }

    const keyDownHandler = (e, i) => {
        if (e.key === "Backspace" && i > 0 && !e.target.value) {
            inputRef.current[i - 1].focus();
        }
    }

    return <div className="flex items-center justify-evenly my-4">
        {inputValue.map((v,i) => <input
            key={i}
            ref={(ele) => (inputRef.current[i] = ele)}
            readOnly={verify}
            autoFocus={i === 0 && true}
            autoComplete="none"
            onClick={inputClickHandler}
            className="text-xl font-bold dark:text-white rounded-md border border-gray-400 h-9 w-9 flex items-center justify-center outline-none text-center"
            value={v}
            type="text"
            onChange={(e) => inputChangeHandler(e, i)}
            onKeyDown={(e) => keyDownHandler(e, i)}
            inputMode="numeric"
        />
        )}
    </div>
}

export default OtpEntry;