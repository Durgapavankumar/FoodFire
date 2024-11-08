import { useSelector } from "react-redux";
import ItemsList from "./ItemsList";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className="m-2 p-2 bg-slate-600 text-yellow-500 rounded-lg"
          onClick={handleClearCart}
        >
          Clear cart
        </button>
        <ItemsList items={cartItems} />
      </div>
    </div>
  );
};
export default Cart;
