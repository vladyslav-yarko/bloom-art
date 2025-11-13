import React, { ReactNode } from 'react'


interface Props {
	children: ReactNode
}


export default function ButtonPrimary({ children, ...props }: Props) {

    return (
			<div className='buttonPrimary'>
				<button {...props} className="w-full h-full">{children}</button>
			</div>
		)
}
