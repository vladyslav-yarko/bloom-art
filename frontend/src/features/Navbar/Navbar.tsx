import ThemeToggler from "./features/ThemeToggler"
import NavHamburger from "./features/NavHamburger"


export default function Navbar() {

    return (
        <nav className="navbar">
            <NavHamburger />
            <ThemeToggler />
        </nav>
    )
}
