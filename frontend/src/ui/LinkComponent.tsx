'use client'

import React from 'react'

import Link from 'next/link'


interface Props {
	title: string
	link: string
	onClick: React.MouseEventHandler<HTMLAnchorElement>
}


export default function LinkComponent({ title, link, onClick }: Props) {
	return (
		<Link
			href={link}
			onClick={onClick}
			className='flex items-center justify-center w-full h-full'
		>
			{title}
		</Link>
	)
}
