"use client"


interface Props {
    placeholder: string
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}


export default function TextField({ placeholder, value, setValue }: Props) {

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
