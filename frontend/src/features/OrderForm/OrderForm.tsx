import Form from 'next/form'

import OrderContact from "./features/OrderContact"
import OrderShipping from "./features/OrderShipping"
import makeOrder from './server/makeOrder'


export default function OrderForm() {

    return (
        <Form action={makeOrder} className="orderForm">
            <OrderContact />
            <OrderShipping />
        </Form>
    )
}
