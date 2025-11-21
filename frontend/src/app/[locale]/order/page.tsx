import { Suspense } from "react"
import Form from "next/form"

import OrderForm from "@/features/OrderForm"
import OrderItem from "@/features/OrderItem/OrderItem"
import LoadingState from "@/ui/LoadingState"
import makeOrder from "@/features/OrderForm/server/makeOrder"
import SubmitButton from "@/ui/SubmitButton"


export default function OrderPage() {

    return (
			<Form action={makeOrder} className="flex flex-col items-center text-center">
				<div className='order'>
					<Suspense
						fallback={
							<div className='loadingIconCard'>
								<LoadingState />
							</div>
						}
					>
						<OrderItem />
					</Suspense>
					<OrderForm />
				</div>
				<div className='orderSubmit'>
					<SubmitButton>
						<h2>Make order</h2>
					</SubmitButton>
				</div>
			</Form>
		)
}
