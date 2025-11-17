import Image from "next/image";


interface Props {
    src: string,
    alt: string,
    className?: string
}


export default function ImageComponent({ src, alt, className="" }: Props) {

    return (
        <div className={`${className}`}>
            <Image 
                src={src}
                alt={alt}
                fill
                className="object-cover"
            />
        </div>
    )
}
