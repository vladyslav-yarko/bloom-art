import NavHamburgerMenuItem from "./NavHamburgerMenuItem"


export default function NavHamburgerMenu() {

    return (
			<div className='hamburgerMenu'>
				<NavHamburgerMenuItem title='Home' link='/' />
				<NavHamburgerMenuItem title='Cart' link='/cart' />
			</div>
		)
}
