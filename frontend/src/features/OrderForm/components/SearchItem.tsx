import React from "react"


interface Props {
	itemKey: string
	value: any
	setValue: React.Dispatch<React.SetStateAction<any>>
    item: any
}


function SearchItem({ itemKey, value, setValue, item }: Props) {

    function handleClick() {
        setValue(item)
    }

    return (
			<p className='search-item' key={itemKey} onClick={handleClick}>
				{value}
			</p>
		)
}


export default SearchItem
