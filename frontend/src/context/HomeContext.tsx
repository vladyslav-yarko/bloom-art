'use client'

import { createContext, useState, ReactNode } from 'react'

import { Item } from '@/types/home'


interface ContextType {
	selectedProduct: Item | null
	setSelectedProduct: React.Dispatch<React.SetStateAction<Item | null>>
	productBase64: string | null
	setProductBase64: React.Dispatch<React.SetStateAction<string | null>>
	setSelectedPerfume: Function
}


interface Props {
    children: ReactNode
}


export const HomeContext = createContext<ContextType | undefined>(undefined)


export const HomeContextProvider = ({ children }: Props) => {
	const [ selectedProduct, setSelectedProduct ] = useState<Item | null>(null);
	const [ productBase64, setProductBase64 ] = useState<string | null>(null)

	function setSelectedPerfume(item: Item, base64Str: string, allowScroll: boolean): void {
		setSelectedProduct(item)
		setProductBase64(base64Str)
		if (allowScroll === false) {
			// prohibit to scroll the page (the modal window is closed)
			document.body.style.overflow = 'hidden'
		} else {
			// allow to scroll the page (the modal window is opened)
			document.body.style.overflow = 'auto'
		}
	}

	return (
		<HomeContext.Provider
			value={{
				selectedProduct,
				setSelectedProduct,
				productBase64,
				setProductBase64,
				setSelectedPerfume,
			}}
		>
			{children}
		</HomeContext.Provider>
	)
}
