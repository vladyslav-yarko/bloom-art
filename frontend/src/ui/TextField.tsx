"use client"


interface Props {
	placeholder: string
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
	error: string
	inputClaseName?: string
	name?: string
}


export default function TextField({ placeholder, value, setValue, error, inputClaseName = '', ...props }: Props) {

    return (
        <div>
            <input 
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={inputClaseName}
                {...props}
            />
            <p className="errorField">{error}</p>
        </div>
    )
}
