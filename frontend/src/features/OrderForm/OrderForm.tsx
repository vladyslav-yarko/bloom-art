"use client"

import { Suspense, useContext } from 'react'
// import Form from "next/form"

import OrderContact from "./features/OrderContact"
import OrderShipping from "./features/OrderShipping"
import LoadingState from '@/ui/LoadingState'
import makeOrder from './server/makeOrder'
import { OrderContext } from '@/context/OrderContext'
import SubmitButton from '@/ui/SubmitButton'


export default function OrderForm() {
	const { showFlashMessage, showSuccessFlashMessage } = useContext(OrderContext)!

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const response = await makeOrder(formData)
		if (!response) {
			showFlashMessage()
			return
		}
		const orderKey = process.env.NEXT_PUBLIC_ORDER_KEY!
		localStorage.removeItem(orderKey)
		showSuccessFlashMessage()
	}

    return (
			<form onSubmit={handleSubmit} className='orderForm'>
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
				<div className='orderSubmit'>
					<SubmitButton>
						<h2>Make order</h2>
					</SubmitButton>
				</div>
			</form>
		)
}
