"use client"

import { useEffect, useState } from "react"

import CartItemCard from "./components/CartItemCard"
import { Item } from "@/types/home"
import ButtonPrimary from "@/ui/ButtonPrimary"
import LinkComponent from "@/ui/LinkComponent"


export default function CartItems() {
    const [ cartItems, setCartItems ] = useState<Record<string, Item> | null>(null)

    useEffect(() => {
        const cartKey = process.env.NEXT_PUBLIC_CART_KEY ?? ''
		type Cart = {
			perfumes: Record<string, Item>
		}
		let cartData: Cart
		const stored = localStorage.getItem(cartKey)
		if (!stored) {
			cartData = { perfumes: {} }
		} else {
			try {
				cartData = JSON.parse(stored) as Cart
			} catch {
				cartData = { perfumes: {} }
			}
		}
        setCartItems(cartData.perfumes)
    }, [])

    return (
			<div className='cartItems'>
				{cartItems && Object.keys(cartItems).length > 0 ? (
					Object.entries(cartItems).map(([key, item]) => (
						<CartItemCard key={key} item={item} />
					))
				) : (
					<div className='cartItemsAbsence'>
						<h2>No items in cart!</h2>
						<ButtonPrimary>
							<LinkComponent title='Add items to cart' link='/' />
						</ButtonPrimary>
					</div>
				)}
			</div>
		)
}
