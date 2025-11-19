import LanguageHamburgerMenuItem from "./LanguageHamburgerMenuItem"


export default function LanguageMenu() {

    return (
			<div className='languageMenu'>
				<LanguageHamburgerMenuItem title='EN' languageKey='en' />
				<LanguageHamburgerMenuItem title='UK' languageKey='uk' />
			</div>
		)
}
