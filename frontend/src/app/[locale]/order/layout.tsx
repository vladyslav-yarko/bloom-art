import React, { ReactNode } from 'react'

import { OrderContextProvider } from '@/context/OrderContext'


interface Props {
    children: ReactNode
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
