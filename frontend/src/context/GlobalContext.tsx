'use client'

import { createContext, ReactNode, useEffect } from 'react'


interface ContextType {
	cartKey: string
}


interface Props {
    children: ReactNode
}


export const GlobalContext = createContext<ContextType | undefined>(undefined)


export const GlobalContextProvider = ({ children }: Props) => {
    const cartKey = process.env.NEXT_PUBLIC_CART_KEY ? process.env.NEXT_PUBLIC_CART_KEY : ""
    
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
                cartKey
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}
