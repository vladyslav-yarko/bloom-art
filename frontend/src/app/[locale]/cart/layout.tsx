import React, { ReactNode } from 'react'


interface Props {
	children: ReactNode
}


export default function ContactLayout({ children }: Props) {

	return (
        <div>
            {children}
        </div>
    )
}
