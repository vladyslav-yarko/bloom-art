import { Suspense, useContext } from 'react'

import ImageComponent from '@/ui/ImageComponent'
import LoadingState from '@/ui/LoadingState'
import { OrderContext } from '@/context/OrderContext'
import { toBase64 } from '@/lib/img'
import SubmitButton from '@/ui/SubmitButton'


function OrderItem() {
    const {
			item
		} = useContext(OrderContext)!
    const image = toBase64(item!.picture)

    return (
			<div className='orderItem'>
				<Suspense fallback={
                    <div className='loadingIconCard'>
                        <LoadingState />
                    </div>}>
					<ImageComponent src={image} alt='perfume' />
					<h1>{item?.title}</h1>
					<h2>{`${item?.price}${item?.currency}`}</h2>
                    <div>
                        <SubmitButton>
                            <h2>Make order</h2>
                        </SubmitButton>
                    </div>
				</Suspense>
			</div>
		)
}


export default OrderItem
