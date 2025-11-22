import React, { ReactNode } from 'react'
import { Metadata } from 'next'

import { OrderContextProvider } from '@/context/OrderContext'


interface Props {
    children: ReactNode
}


export const metedata: Metadata = {
	title: 'Bloom-Art: Order',
}


export default function OrderLayout({ children }: Props) {

    return (
        <div>
            <OrderContextProvider>
                {children}
            </OrderContextProvider>
        </div>
    )
}
