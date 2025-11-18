"use client"

import ImageComponent from "@/ui/ImageComponent"
import { Item } from "@/types/home"
import { toBase64 } from "@/lib/img"
import { useState } from "react"


interface Props {
    item: Item
}


export default function CartItemCard({ item }: Props) {
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
        <div className='grid gird-cols-1 gap-y-1.5 shadow transition hover:shadow hover:shadow-accent dark:hover:shadow-accent-dark rounded-lg p-10 bg-background dark:bg-background-dark cursor-pointer
        max-w-45 md:max-w-48 lg:max-w-70' key={item.title + '_pc'}>
            <ImageComponent src={`data:image/jpeg;base64,${base64Str}`} alt="perfume" className="relative w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 overflow-hidden rounded-lg"/>
            <h2>{item.title}</h2>
            <p>
                {item.description}
            </p>
            <div>{item.price} {item.currency}</div>
            <h2>Available: {item.available}</h2>
            <div>
                <h2>Quantity: {quantity}</h2>
                
            </div>
        </div>
    );
}
