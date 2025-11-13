import React, { ReactNode } from 'react'


interface Props {
    children: ReactNode
}


export default function ButtonComponent({ children }) {

    return (
        <div>
            {children}
        </div>
    )
}
