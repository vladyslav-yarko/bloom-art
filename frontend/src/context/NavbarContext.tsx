'use client'

import { createContext, useState, ReactNode } from 'react'


interface ContextType {
	menuOpened: boolean
	setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>
	languageMenuOpened: boolean
	setLanguageMenuOpened: React.Dispatch<React.SetStateAction<boolean>>
}


interface Props {
	children: ReactNode
}


export const NavbarContext = createContext<ContextType | undefined>(undefined)


export const NavbarContextProvider = ({ children }: Props) => {
    const [ menuOpened, setMenuOpened ] = useState<boolean>(false)
    const [ languageMenuOpened, setLanguageMenuOpened ] = useState<boolean>(false)

	return (
		<NavbarContext.Provider value={{
            menuOpened, setMenuOpened, languageMenuOpened, setLanguageMenuOpened
        }}>
			{children}
		</NavbarContext.Provider>
	)
}
