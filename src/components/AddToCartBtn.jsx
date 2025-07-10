import { selectCart, setItemToCart, setItemQuantity } from "../features/home/restaurantsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";

const AddToCartBtn = ({ data, pY = "py-1", pX = "px-8", font_size = '', quantityBtnPadding = "p-2", number_width = "w-9" }) => {

    const currentRestaurantId = data.restaurantData.metadata?.id || data.restaurantData.id;
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();
    const object = cart[data.item.id] || { quantity: 0 };
    const quantity = object.quantity;

    const addItemsToCart = ({ action, type = null }) => {
        const [firstKey] = Object.keys(cart);
        const presentRestaurant = cart[firstKey]?.restaurantData?.metadata?.id;

        if (action === "Add") {
            if (presentRestaurant && (presentRestaurant !== currentRestaurantId)) {
                toast.info("Clear cart to add items from this restaurant.", {
                    autoClose: 3000,
                    style: {
                        backgroundColor: "red",
                        color: "white",
                        fontWeight: "medium",
                    },
                    progressClassName: "progress-style",
                });
                return;
            } else {
                addBtnClickHandler();
            }
        } else {
            quantityBtnClickHandler(type);
        }
    }

    const addBtnClickHandler = () => {
        dispatch(setItemToCart({
            add: true,
            id: data.item.id,
            data: data
        }))
    }

    const quantityBtnClickHandler = (type) => {
        if (type === "plus") {
            dispatch(setItemQuantity({ id: data.item.id, type: "plus" }))
        } else {
            dispatch(setItemQuantity({ id: data.item.id, type: "minus" }))
        }
    }

    if (!quantity) {
        return <button onClick={() => addItemsToCart({ action: "Add"})} className={`${pY} ${pX} rounded bg-green-400 text-white font-semibold tracking-tight transform cursor-pointer active:scale-95 transition-all duration-100 ease-in-out select-none ${font_size}`}>
            Add
        </button>
    } else {
        return <div className="flex items-center w-fit bg-white rounded overflow-hidden">
            <button onClick={() => addItemsToCart({ action: "Change_Quantity", type: "minus"})} className={`group bg-green-400 ${quantityBtnPadding} transform cursor-pointer font-semibold active:bg-transparent transition-all duration-100 ease-in-out`}>
                <Minus size={16} strokeWidth={2} className="text-white group-active:text-black" />
            </button>
            <span className={`h-full ${number_width} flex items-center font-mono justify-center tracking-tight font-semibold text-black select-none`}>{quantity}</span>
            <button onClick={() => addItemsToCart({ action: "Change_Quantity", type: "plus"})} className={`group bg-green-400 ${quantityBtnPadding} transform cursor-pointer font-semibold active:bg-transparent transition-all duration-100 ease-in-out`}>
                <Plus size={16} strokeWidth={2} className="text-white group-active:text-black" />
            </button>
        </div>
    }
}

export default AddToCartBtn;