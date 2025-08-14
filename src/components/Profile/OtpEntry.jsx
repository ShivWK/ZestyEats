import { useState, useRef } from "react";

const OtpEntry = ({ count }) => {
    const inputBoxCount = Array.from({ length: count }, (_, i) => "");
    const [ inputValue, setInputValue ] = useState(inputBoxCount);

    const inputClickHandler = (e) => {
        e.stopPropagation();
    }

    const inputChangeHandler = (e, i) => {
        if (isNaN(e.target.value)) return

        setInputValue(prv => {
            const newArr = [...prv];
            newArr[i] = e.target.value.slice(-1);

            return newArr;
        })
    }

    return <div className="flex items-center justify-evenly my-4">
        {inputValue.map((v,i) => <input
            key={i}
            autoFocus={i === 0 && true}
            autoComplete="none"
            onClick={inputClickHandler}
            className="text-xl font-bold dark:text-white rounded-md border border-gray-400 h-9 w-9 flex items-center justify-center outline-none text-center"
            value={v}
            type="text"
            onChange={(e) => inputChangeHandler(e, i)}
        />
        )}
    </div>
}

export default OtpEntry;