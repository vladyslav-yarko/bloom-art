import React, { ReactNode } from 'react'
import { Metadata } from 'next'


interface Props {
	children: ReactNode
}


export const metedata: Metadata = {
	title: 'Bloom-Art: Cart',
}


export default function ContactLayout({ children }: Props) {

	return (
        <div>
            {children}
        </div>
    )
}
