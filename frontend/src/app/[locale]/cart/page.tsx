import CartItems from "@/features/CartItems"
import CartTitle from "@/features/CartTitle/CartTitle"


export default function CartPage() {

    return (
        <div className="cart">
            <CartTitle />
            <CartItems />
        </div>
    )
}
