'use client'

import { createContext, ReactNode, useEffect, useState } from 'react'


interface ContextType {
	cartKey: string
	orderAction: boolean
	setOrderAction: React.Dispatch<React.SetStateAction<boolean>>
	orderCreated: boolean
	setOrderCreated: React.Dispatch<React.SetStateAction<boolean>>
}


interface Props {
    children: ReactNode
}


export const GlobalContext = createContext<ContextType | undefined>(undefined)


export const GlobalContextProvider = ({ children }: Props) => {
    const cartKey = process.env.NEXT_PUBLIC_CART_KEY ? process.env.NEXT_PUBLIC_CART_KEY : ""

    const [ orderAction, setOrderAction ] = useState<boolean>(false)
    const [ orderCreated, setOrderCreated ] = useState<boolean>(false)
    
    useEffect(() => {
        const cart = localStorage.getItem(cartKey)

        if (!cart) {
            localStorage.setItem(cartKey, JSON.stringify({
                perfumes: {}
            }))
            return
        }

        try {
            JSON.parse(cart)
        } catch {
            localStorage.setItem(cartKey, JSON.stringify({
                perfumes: {}
            }))
        }
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                cartKey,
                orderAction,
                setOrderAction,
                orderCreated,
                setOrderCreated
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
