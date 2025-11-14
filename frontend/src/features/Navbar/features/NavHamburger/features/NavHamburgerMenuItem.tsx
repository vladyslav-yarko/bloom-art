"use client"

import { useContext } from "react"

import LinkComponent from "@/ui/LinkComponent"

import { NavbarContext } from "@/context/NavbarContext"


interface Props {
    title: string,
    link: string
}


export default function NavHamburgerMenuItem({ title, link }: Props) {
    const { setMenuOpened } = useContext(NavbarContext)!

    const closeMenu = () => {
        setMenuOpened(false)
    }

    return (
			<div className='hamburgerMenuItem'>
				<LinkComponent title={title} link={link} onClick={() => closeMenu()} />
			</div>
		)
}
