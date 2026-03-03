import { useContext } from "react";
import CardListHorizontal from "../components/CardListHorizontal";
import { CartContext } from "../contexts/CartContext";

export default function Checkout() {
    const {cart} = useContext(CartContext);

    return (
        <div>
            <CardListHorizontal data={cart} isCheckoutPage={true} />            
        </div>
    )
}