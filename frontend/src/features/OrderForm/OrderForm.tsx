import OrderContact from "./features/OrderContact"
import OrderShipping from "./features/OrderShipping"


export default function OrderForm() {

    return (
        <div className="orderForm">
            <OrderContact />
            <OrderShipping />
        </div>
    )
}
