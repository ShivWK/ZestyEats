

export default function Button({ ref, clickHandler, iconClass }) {
    return <button 
                ref={ref} 
                onClick={clickHandler} 
                className="group disabled:cursor-not-allowed cursor-pointer" >
                    <i className={`ri-arrow-${iconClass}-circle-fill text-[40px] text-[#ff5200] group-disabled:text-gray-400`}></i>
            </button>
}