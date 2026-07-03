import {
  selectCart,
  setItemToCart,
  setItemQuantity,
} from '../features/home/restaurantsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const AddToCartBtn = ({
  data,
  pY = 'py-1',
  pX = 'px-8',
  font_size = '',
  quantityBtnPadding = 'p-2',
  number_width = 'w-9',
}) => {
  const currentRestaurantId =
    data.restaurantData.metadata?.id || data.restaurantData.id;
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const object = cart[data.item.id] || { quantity: 0 };
  const quantity = object.quantity;

  const addItemsToCart = ({ action, type = null }) => {
    const [firstKey] = Object.keys(cart);
    const presentRestaurant =
      cart[firstKey]?.restaurantData?.metadata?.id ||
      cart[firstKey]?.restaurantData?.id;

    if (action === 'Add') {
      if (presentRestaurant && presentRestaurant !== currentRestaurantId) {
        console.log('Called');
        toast.info('Clear cart to add items from this restaurant.', {
          autoClose: 3000,
          style: {
            backgroundColor: 'red',
            color: 'white',
            fontWeight: 'medium',
          },
          progressClassName: 'progress-style',
        });
        return;
      } else {
        addBtnClickHandler();
      }
    } else {
      quantityBtnClickHandler(type);
    }
  };

  const addBtnClickHandler = () => {
    dispatch(
      setItemToCart({
        add: true,
        id: data.item.id,
        data: data,
      }),
    );
  };

  const quantityBtnClickHandler = (type) => {
    if (type === 'plus') {
      dispatch(setItemQuantity({ id: data.item.id, type: 'plus' }));
    } else {
      dispatch(setItemQuantity({ id: data.item.id, type: 'minus' }));
    }
  };

  if (!quantity) {
    return (
      <button
        onClick={() => addItemsToCart({ action: 'Add' })}
        className={`${pY} ${pX} transform cursor-pointer rounded bg-green-400 font-semibold tracking-tight text-white transition-all duration-100 ease-in-out select-none active:scale-95 ${font_size}`}
      >
        Add
      </button>
    );
  } else {
    return (
      <div className="flex w-fit items-center overflow-hidden rounded bg-white">
        <button
          onClick={() =>
            addItemsToCart({ action: 'Change_Quantity', type: 'minus' })
          }
          className={`group bg-green-400 ${quantityBtnPadding} transform cursor-pointer font-semibold transition-all duration-100 ease-in-out active:bg-transparent`}
        >
          {quantity === 1 ? (
            <Trash2
              size={16}
              strokeWidth={3}
              className="text-white group-active:text-black"
            />
          ) : (
            <Minus
              size={16}
              strokeWidth={3}
              className="text-white group-active:text-black"
            />
          )}
        </button>
        <span
          className={`h-full ${number_width} flex items-center justify-center font-mono font-semibold tracking-tight text-black select-none`}
        >
          {quantity}
        </span>
        <button
          onClick={() =>
            addItemsToCart({ action: 'Change_Quantity', type: 'plus' })
          }
          className={`group bg-green-400 ${quantityBtnPadding} transform cursor-pointer font-semibold transition-all duration-100 ease-in-out active:bg-transparent`}
        >
          <Plus
            size={16}
            strokeWidth={3}
            className="text-white group-active:text-black"
          />
        </button>
      </div>
    );
  }
};

export default AddToCartBtn;
