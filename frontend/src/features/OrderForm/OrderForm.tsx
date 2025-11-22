"use client"

import { Suspense, useContext } from 'react'
import { useTranslations } from 'next-intl'
// import Form from "next/form"

import OrderContact from "./features/OrderContact"
import OrderShipping from "./features/OrderShipping"
import LoadingState from '@/ui/LoadingState'
import makeOrder from './server/makeOrder'
import { OrderContext } from '@/context/OrderContext'
import SubmitButton from '@/ui/SubmitButton'
// import { GlobalContext } from '@/context/GlobalContext'
import FlashMessage from '@/ui/FlashMessage'


export default function OrderForm() {
	const t = useTranslations("OrderPage")

	const {
		showFlashMessage,
		showSuccessFlashMessage,
		showSameFlashMessage,
		orderError,
		// firstName,
		// lastName,
		// phoneNumber,
		// selectedLocality,
		// selectedPoint
	} = useContext(OrderContext)!
	// const { orderAction, orderCreated } = useContext(GlobalContext)!

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const form = e.currentTarget
		const formData = new FormData(form)
		const response = await makeOrder(formData)
		if (!response) {
			showSameFlashMessage()
			return
		}
		const orderKey = process.env.NEXT_PUBLIC_ORDER_KEY!
		localStorage.removeItem(orderKey)
		showSuccessFlashMessage()
	}

    return (
			<form onSubmit={handleSubmit} className='orderForm'>
				{orderError ? (
					<FlashMessage
						isSuccessful={false}
						text={t("Error")}
					/>
				) : null}
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
						<h2>{t("submit")}</h2>
					</SubmitButton>
				</div>
			</form>
		)
}
