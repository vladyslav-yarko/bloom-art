"use client"

import { useTranslations } from "next-intl"

import ImageComponent from "@/ui/ImageComponent"
import { Item } from "@/types/home"
import { toBase64 } from "@/lib/img"
import { useState } from "react"
import MinusIcon from "@/ui/MinusIcon"
import PlusIcon from "@/ui/PlusIcon"


interface Props {
    item: Item
}


export default function CartItemCard({ item }: Props) {
	const t = useTranslations('CartPage.CartItemCard')

    const [ quantity, setQuantity ] = useState<number>(1)

    const incrementQuantity = () => {
        const incrementedQuantity = quantity + 1
        if (incrementedQuantity <= item.available) {
            setQuantity(incrementedQuantity)
        }
    }

    const decrementQuantity = () => {
        const decrementedQuantity = quantity - 1
        if (decrementedQuantity >= 1) {
            setQuantity(decrementedQuantity)
        }
    }

    const base64Str = toBase64(item.picture)

    return (
			<div className='cartItemCard' key={item.title + '_pc'}>
				<ImageComponent
					src={`data:image/jpeg;base64,${base64Str}`}
					alt='perfume'
					className='relative w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 overflow-hidden rounded-lg'
				/>
				<h2>{item.title}</h2>
				<p>{item.description}</p>
				<div>
					{item.price} {item.currency}
				</div>
				<h2>{t("available")}: {item.available}</h2>
				<p>{t("quantity")}: {quantity}</p>
				<div className='quantityItem'>
					<div className='quantityButton' onClick={() => decrementQuantity()}>
						<MinusIcon />
					</div>
					<div className='quantityButton' onClick={() => incrementQuantity()}>
						<PlusIcon />
					</div>
				</div>
			</div>
		)
}
