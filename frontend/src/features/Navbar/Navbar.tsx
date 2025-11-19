import ThemeToggler from "./features/ThemeToggler"
import NavHamburger from "./features/NavHamburger"
import LanguageToggler from "./features/LanguageToggler"


export default function Navbar() {

    return (
        <nav className="navbar">
            <NavHamburger />
            <LanguageToggler />
            <ThemeToggler />
        </nav>
    )
}
