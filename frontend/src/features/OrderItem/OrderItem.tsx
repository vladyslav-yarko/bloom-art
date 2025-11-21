"use client"

import { useContext, useState, useEffect } from 'react'

import ImageComponent from '@/ui/ImageComponent'
import LoadingState from '@/ui/LoadingState'
import { OrderContext } from '@/context/OrderContext'
import { toBase64 } from '@/lib/img'


function OrderItem() {
    const [ image, setImage ] = useState<string | null>(null)
    const {
			item
		} = useContext(OrderContext)!

    useEffect(() => {
        if (!item) {
            return
        }
        const base64Image = toBase64(item!.picture)
        setImage(base64Image)
    }, [item])

    return (
			<div className='orderItem'>
				{image ? (
					<>
						<ImageComponent
							src={`data:image/jpeg;base64,${image}`}
							alt='perfume'
							className='relative w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 overflow-hidden rounded-lg'
						/>
						<h1>{item?.title}</h1>
						<h2>{`${item?.price}${item?.currency}`}</h2>
					</>
				) : (
					<div className='loading'>
						<LoadingState />
					</div>
				)}
			</div>
		)
}


export default OrderItem
