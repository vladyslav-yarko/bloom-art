import { ReactNode } from "react"

import Link from "next/link"


interface Props {
    link: string,
    children: ReactNode
}


export default function LinkNewTabComponent({ link, children }: Props) {

    return (
        <Link target="_blank" href={link}>
            {children}
        </Link>
    )
}
