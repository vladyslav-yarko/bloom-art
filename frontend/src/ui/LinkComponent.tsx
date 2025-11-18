'use client'

import React from 'react'

// import Link from 'next/link'
import { Link } from '../i18n/navigation'


interface Props {
	title: string
	link: string
	onClick?: React.MouseEventHandler<HTMLAnchorElement>
}


export default function LinkComponent({ title, link, onClick }: Props) {
	return (
		<Link
			href={link}
			className='flex items-center justify-center w-full h-full'
			onClick={onClick}
		>
			{title}
		</Link>
	)
}
