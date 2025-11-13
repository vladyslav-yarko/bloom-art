'use client'

import { createContext, useState, ReactNode } from 'react'


interface ContextType {
	menuOpened: boolean
	setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>
}


interface Props {
	children: ReactNode
}


export const NavbarContext = createContext<ContextType | undefined>(undefined)


export const NavbarContextProvider = ({ children }: Props) => {
    const [ menuOpened, setMenuOpened ] = useState(false)

	return (
		<NavbarContext.Provider value={{
            menuOpened, setMenuOpened
        }}>
			{children}
		</NavbarContext.Provider>
	)
}
