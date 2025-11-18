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
    const cartKey = 'artstudia_cart'
    
    useEffect(() => {
        const cart = localStorage.getItem(cartKey)

        if (!cart) {
            localStorage.setItem(cartKey, JSON.stringify({}))
            return
        }

        try {
            JSON.parse(cart)
        } catch {
            localStorage.setItem(cartKey, JSON.stringify({}))
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
