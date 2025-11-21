'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'

import ButtonPrimary from "./ButtonPrimary";


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
}


export default function SubmitButton({ children, ...props }: Props) {
    const { pending } = useFormStatus()

    return (
        <>
            <ButtonPrimary isSubmit={true} disabled={pending} {...props}>
                {children}
            </ButtonPrimary>
        </>
    )
}
