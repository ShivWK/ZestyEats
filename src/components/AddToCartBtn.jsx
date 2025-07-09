import { selectCart, setItemToCart, setItemQuantity } from "../features/home/restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Minus } from "lucide-react";

const AddToCartBtn = ({ data, pY = "py-1", pX = "px-8", font_size = '', quantityBtnPadding = "p-2" ,number_width="w-9" }) => {
    // console.log(data)

    const cart = useSelector(selectCart);
    const dispatch = useDispatch();
    const object = cart[data.item.id] || {quantity: 0};
    const quantity = object.quantity;

    const addBtnClickHandler = () => {
        dispatch(setItemToCart({
            add: true,
            id: data.item.id,
            data: data
        }))
    }

    const quantityBtnClickHandler = (type) => {
        if (type === "plus") {
            dispatch(setItemQuantity({ id: data.item.id, type: "plus"}))
        } else {
            dispatch(setItemQuantity({ id: data.item.id, type: "minus"}))
        }
    }

    if (!quantity) {
        return <button onClick={addBtnClickHandler} className={`${pY} ${pX} rounded bg-green-400 text-white font-semibold tracking-tight transform cursor-pointer active:scale-95 transition-all duration-100 ease-in-out select-none ${font_size}`}>
            Add
        </button>
    } else {
        return <div className="flex items-center w-fit bg-white rounded overflow-hidden">
            <button onClick={() => quantityBtnClickHandler("minus")} className={`group bg-green-400 ${quantityBtnPadding} transform cursor-pointer font-semibold active:bg-transparent transition-all duration-100 ease-in-out`}>
                <Minus size={16} strokeWidth={2} className="text-white group-active:text-black"/>
            </button>
            <span className={`h-full ${number_width} flex items-center font-mono justify-center tracking-tight font-semibold text-black select-none`}>{quantity}</span>
            <button onClick={() => quantityBtnClickHandler("plus")} className={`group bg-green-400 ${quantityBtnPadding} transform cursor-pointer font-semibold active:bg-transparent transition-all duration-100 ease-in-out`}>
                <Plus size={16} strokeWidth={2} className="text-white group-active:text-black"/>
            </button>
        </div>
    }
}

export default AddToCartBtn;