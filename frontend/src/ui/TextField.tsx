"use client"


interface Props {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string | null>>
}


export default function TextField({ value, setValue }: Props) {

    return (
        <div>
            <input 
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
