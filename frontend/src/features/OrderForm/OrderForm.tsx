import { Suspense } from 'react'

import OrderContact from "./features/OrderContact"
import OrderShipping from "./features/OrderShipping"
import LoadingState from '@/ui/LoadingState'


export default function OrderForm() {

    return (
			<div className='orderForm'>
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
			</div>
		)
}
