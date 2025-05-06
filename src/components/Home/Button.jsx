export default function Button({ ref, clickHandler, iconClass }) {
    return <button 
                ref={ref} 
                onClick={clickHandler} 
                className="group cursor-pointer" >
                    <i className={`ri-arrow-${iconClass}-circle-fill text-[40px] text-primary group-disabled:text-gray-400 group-hover:text-[#aa0e0e] group-active:text-primary
                    transition-all duration-75 ease-in `}></i>
            </button>
}