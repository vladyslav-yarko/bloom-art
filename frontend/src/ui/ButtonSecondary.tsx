import React, { ReactNode } from 'react'


interface Props {
	children: ReactNode
}



export default function ButtonSecondary({ children }: Props) {

    return (
			<div className='buttonSecondary'>
				<button className='w-full h-full'>{children}</button>
			</div>
		)
}
