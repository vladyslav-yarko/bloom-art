import { useTranslations } from "next-intl"

import NavHamburgerMenuItem from "./NavHamburgerMenuItem"


export default function NavHamburgerMenu() {
    const t = useTranslations('Navbar.Hamburger')

    return (
            <div className='hamburgerMenu'>
                <NavHamburgerMenuItem title={t("home")} link='/' />
                <NavHamburgerMenuItem title={t("cart")} link='/cart' />
            </div>
        )
}
