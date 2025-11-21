import React, { useEffect, useState } from 'react'

import SearchArea from './SearchArea'
import TextField from '@/ui/TextField'


interface Props {
	searchItemWarning: string
	searchItemPlaceholder: string
	searchItemId: string
	data: [] | {}
	value: any
	setValue: React.Dispatch<React.SetStateAction<any>>
	valueName: string
	filterFunction: (...args: any[]) => any
	addValue?: any
}


function SearchSystem({
	searchItemWarning,
	searchItemPlaceholder,
	searchItemId,
	data,
	value,
	setValue,
	valueName,
	filterFunction,
    addValue = null
}: Props) {

	const [ searchValue, setSearchValue ] = useState("")
	const [ searchElements, setSearchElements ] = useState([])

	useEffect(() => {
		if (!searchValue) {
			return
		}
		setSearchElements(filterFunction(data, searchValue, addValue))
	}, [searchValue])

	return (
		<div className='search'>
			<div className='search-selected-item'>
				{value ? value[valueName] : searchItemWarning}
			</div>
			<div className={value ? 'hidden' : ''}>
				<TextField
					placeholder={searchItemPlaceholder}
					value={searchValue}
					setValue={setSearchValue}
                    error=''
				/>
				<SearchArea
					data={searchValue ? searchElements : []}
					valueName={valueName}
					setValue={setValue}
				/>
			</div>
		</div>
	)
}


export default SearchSystem
