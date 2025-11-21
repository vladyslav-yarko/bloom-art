"use client"


interface Props {
    placeholder: string
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
    error: string
}


export default function TextField({ placeholder, value, setValue, error }: Props) {

    return (
        <div>
            <input 
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <p className="errorField">{error}</p>
        </div>
    )
}
