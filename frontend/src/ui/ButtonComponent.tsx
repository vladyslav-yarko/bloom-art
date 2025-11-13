import React, { ReactNode } from 'react'


interface Props {
    children: ReactNode
}


export default function ButtonComponent({ children }: Props) {

    return (
        <div>
            {children}
        </div>
    )
}
