import Form from 'next/form'
import { Suspense } from 'react'

import OrderContact from "./features/OrderContact"
import OrderShipping from "./features/OrderShipping"
import makeOrder from './server/makeOrder'
import LoadingState from '@/ui/LoadingState'


export default function OrderForm() {

    return (
			<Form action={makeOrder} className='orderForm'>
				<Suspense
					fallback={
						<div className='loading'>
							<LoadingState />
						</div>
					}
				>
					<OrderContact />
				</Suspense>
				<Suspense
					fallback={
						<div className='loading'>
							<LoadingState />
						</div>
					}
				>
					<OrderShipping />
				</Suspense>
			</Form>
		)
}
