"use client"

import { useContext } from "react"

import NavHamburgerIcon from "../../../../../../../portfolio/src/features/Navbar/features/NavHamburger/components/NavHamburgerIcon"
import NavHamburgerMenu from "../../../../../../../portfolio/src/features/Navbar/features/NavHamburger/features/NavHamburgerMenu"

import { NavbarContext } from "@/context/NavbarContext"


export default function NavHamburger() {
    const { menuOpened, setMenuOpened } = useContext(NavbarContext)!

    const toggleMenu = () => {
        setMenuOpened(prev => !prev)
    }

    return (
        <div className="relative">
            <NavHamburgerIcon onClick={() => toggleMenu()} menuOpened={menuOpened}/>
            {
                menuOpened ? (
                    <NavHamburgerMenu />
                ) : (
                    null
                )
            }
        </div>
    )
}
