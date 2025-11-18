import React, { ReactNode } from 'react'


interface Props {
    children: ReactNode
}


export default function OrderLayout({ children }: Props) {

    return (
        <div>
            {children}
        </div>
    )
}
