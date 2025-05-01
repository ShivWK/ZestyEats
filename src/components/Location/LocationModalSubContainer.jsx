import { closeLocationInModal } from "../../features/Login/loginSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ModalSubContainer = () => {
  const dispatch = useDispatch();
  const [ searchValue, setSearchValue ] = useState('');
  const [ Focused , setFocused ] = useState(false)

  const handleClose = () => {
    dispatch(closeLocationInModal());
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleDivClick = (e) => {
    e.stopPropagation();
    setFocused(true);
  }

  const handleContainerClick = (e) => {
    setFocused(false);
  }

  const handeCancelClick = () => {
    setSearchValue('');
  }

  return (
    <div onClick={handleContainerClick} className="flex flex-col mt-7 w-[75%] h-[90%]">
      <button onClick={handleClose} className="cursor-pointer self-start">
        <i className="ri-close-large-fill text-xl"></i>
      </button>
      <div onClick={handleDivClick} className={`flex justify-between border-[1px] border-gray-400 gap-1.5 w-full mt-7 p-3 cursor-text ${Focused && 'shadow-[0_0_10px_1px_rgba(0,0,0,0.2)]'}`}>
        <input 
            type="text" 
            value={searchValue}
            onChange={handleInputChange}
            className="p-0.5 outline-none font-semibold" 
            placeholder="Search for area, streat name..."
            size={30}
        />
        {(searchValue.length !== 0) && <button onClick={handeCancelClick} className="font-bold text-primary cursor-pointer">Cancel</button>}
      </div>
        <div className="group cursor-pointer border-[1px] border-gray-400 py-4 px-7 mt-8">
            <div className="flex gap-2.5">
                <i class="ri-crosshair-2-line text-xl text-gray-500"></i>
                <div>
                    <p className="font-medium group-hover:text-primary text-lg">Get current location</p>
                    <p className="text-sm font-semibold text-gray-400">Using GPS</p>
                </div>
            </div>
        </div>
        <div className="border-[1px] border-gray-400 mt-6 p-6">
            <p className="text-sm font-semibold text-gray-400">RECENT SEARCHES</p>
        </div>
    </div>
  );
};

export default ModalSubContainer;

// <i class="ri-history-line"></i>