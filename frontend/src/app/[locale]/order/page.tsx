import { Suspense } from "react"

import OrderForm from "@/features/OrderForm"
import OrderItem from "@/features/OrderItem/OrderItem"
import LoadingState from "@/ui/LoadingState"
import SubmitButton from "@/ui/SubmitButton"


export default function OrderPage() {

    return (
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
	)
}
