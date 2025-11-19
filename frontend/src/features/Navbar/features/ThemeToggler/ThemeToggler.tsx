'use client'

import { useEffect, useState } from 'react'
import Sun from './components/Sun'
import Moon from './components/Moon'

export default function ThemeToggler() {
	const [theme, setTheme] = useState<string | null>(null)

	useEffect(() => {
		const saved = localStorage.getItem('artstudia-theme')
		setTheme(saved || 'light')
	}, [])

	useEffect(() => {
		if (!theme) return

		if (['light', 'dark'].includes(theme)) {
			document.documentElement.setAttribute('data-theme', theme)
			localStorage.setItem('artstudia-theme', theme)
		}
	}, [theme])

	const updateTheme = () => {
		setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
	}

	if (!theme) return null

	return (
		<div onClick={updateTheme} className='themeTogglerIcon'>
			{theme === 'dark' ? (
				<Sun width='100%' height='100%' />
			) : (
				<Moon width='100%' height='100%' />
			)}
		</div>
	)
}
