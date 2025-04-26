const EnteryDiv = ({ handleDivClick, hasValue, inputRef, handleInput, placeholder, fallbackPlacehoder, focus }) => {
    return (
        <div onClick={handleDivClick} className="relative p-2.5 border-2 border-gray-400 h-[70px] cursor-text">
            <p className={`absolute font-bold ${hasValue ? "text-red-500" : "text-gray-500"} transition-all duration-300 ${focus ? "top-2.5 text-xs" : "top-[19px] text-lg"}`}>{hasValue ? fallbackPlacehoder : placeholder}</p>
            <input ref={inputRef} onChange={handleInput} className="relative top-5 font-bold text-lg outline-none" type="tel" />
        </div>
    )
}

export default EnteryDiv;