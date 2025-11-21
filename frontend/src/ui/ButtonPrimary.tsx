import { ReactNode, ButtonHTMLAttributes } from 'react'


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	isSubmit?: boolean
}


export default function ButtonPrimary({ children, isSubmit = false, ...props }: Props) {
	return (
		<div className='buttonPrimary'>
			<button {...props} type={isSubmit ? "submit" : 'button'} className='w-full h-full'>
				{children}
			</button>
		</div>
	)
}
