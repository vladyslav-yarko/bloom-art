"use client"

import { useContext } from "react"
import { useLocale } from 'next-intl'

import { usePathname, useRouter } from "@/i18n/navigation"
import { NavbarContext } from "@/context/NavbarContext"


interface Props {
	title: string
	languageKey: string
}


export default function LanguageHamburgerMenuItem({ title, languageKey }: Props) {
	const { setLanguageMenuOpened } = useContext(NavbarContext)!

    const router = useRouter()
    const pathname = usePathname()
    const currentLocale = useLocale()

	const changeLanguage = (): void => {
        router.replace(pathname, { locale: languageKey })
		setLanguageMenuOpened(false)
    }   

	return (
		<div className={`hamburgerMenuItem ${currentLocale === languageKey ? "bg-blue-500" : ""}`} onClick={() => changeLanguage()}>
			<h2>{title}</h2>
		</div>
	)
}
