"use client"

import { useContext } from "react"

import NavLanguageIcon from "./components/NavLanguageIcon"
import LanguageMenu from "./features/LanguageMenu"

import { NavbarContext } from "@/context/NavbarContext"


export default function LanguageToggler() {
    const { languageMenuOpened, setLanguageMenuOpened, setMenuOpened } = useContext(NavbarContext)!

    const toggleMenu = () => {
        setMenuOpened(false)
        setLanguageMenuOpened(prev => !prev)
    }

    return (
        <div className="relative">
            <NavLanguageIcon onClick={() => toggleMenu()} menuOpened={languageMenuOpened}/>
            {
                languageMenuOpened ? (
                    <LanguageMenu />
                ) : (
                    null
                )
            }
        </div>
    )
}
