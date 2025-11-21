import OrderForm from "@/features/OrderForm"
import OrderItem from "@/features/OrderItem/OrderItem"


export default function OrderPage() {

    return (
        <div className="order">
            <OrderItem />
            <OrderForm />
        </div>
    )
}
