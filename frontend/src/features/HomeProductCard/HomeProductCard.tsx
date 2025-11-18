"use client"

import { useContext } from "react"

import { HomeContext } from "@/context/HomeContext" 
import ImageComponent from "@/ui/ImageComponent"
import { toBase64 } from "@/lib/img"
import { Item } from "@/types/home"


interface Props {
	item: Item
}


export default function HomeProductCard({ item }: Props) {
    const context = useContext(HomeContext)
    if (!context) throw new Error("HomeContext used outside provider")
    const { setSelectedPerfume } = context

    const base64Str = toBase64(item.picture)

    return (
			<div
				className='grid gird-cols-1 gap-y-1.5 shadow transition hover:shadow hover:shadow-accent dark:hover:shadow-accent-dark rounded-lg p-10 bg-background dark:bg-background-dark cursor-pointer
        max-w-45 md:max-w-48 lg:max-w-70 hover:scale-110'
				key={item.title + '_pc'}
				onClick={() => setSelectedPerfume(item, base64Str, false)}
			>
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
				<div>
					{item.available >= 1 ? (
						<span>✅ Available</span>
					) : (
						<span>❌ Not Available</span>
					)}
				</div>
			</div>
		)
}
