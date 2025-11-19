import ThemeToggler from "./features/ThemeToggler"
import NavHamburger from "./features/NavHamburger"
import LanguageToggler from "./features/LanguageToggler"


export default function Navbar() {

    return (
			<nav className='navbar'>
				<NavHamburger />

				<div className='flex items-center gap-3'>
					<LanguageToggler />
					<ThemeToggler />
				</div>
			</nav>
		)
}
