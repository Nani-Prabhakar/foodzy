import ItemList from "./ItemList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
const Cart=()=>{
    const dispatch=useDispatch();
    const handleClearCart=()=>{
        dispatch(clearCart())
    }
    const cardItems=useSelector((store)=>store.cart.items)
    return <div className="p-4 m-4 text-center">
        <h1 className="font-bold text-2xl">cart</h1>
        <button onClick={handleClearCart} className="p-2 m-2 bg-black text-white rounded-md">ClearCart</button>
        <div className=" p-2 w-6/12 m-auto">  
            <ItemList items={cardItems}/>
        </div>
    </div>
}
export default Cart;