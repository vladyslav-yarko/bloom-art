import { ReactNode, ButtonHTMLAttributes } from 'react'

import ButtonPrimary from "./ButtonPrimary";


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}


export default function SubmitButton({ children, ...props }: Props) {

    return (
        <>
            <ButtonPrimary isSubmit={true} {...props}>
                {children}
            </ButtonPrimary>
        </>
    )
}
