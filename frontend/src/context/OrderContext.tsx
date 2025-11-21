'use client'

import { createContext, ReactNode } from 'react'


interface ContextType {
    
}


interface Props {
    children: ReactNode
}


export const OrderContext = createContext<ContextType | undefined>(undefined)


export const OrderContextProvider = ({ children }: Props) => {

    return (
        <OrderContext.Provider
            value={{
                
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}
