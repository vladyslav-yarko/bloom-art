"use client"

import { useTranslations } from 'next-intl'

import SearchItem from './SearchItem'
import { Locality, Point } from '@/types/order'


interface Props<T extends Locality | Point> {
	data: T[]
	valueName: keyof T
	setValue: React.Dispatch<React.SetStateAction<any>>
}


function SearchArea<T extends Locality | Point>({
	data,
	valueName,
	setValue,
}: Props<T>) {
	const t = useTranslations("OrderPage")

	return (
		<div className='searchArea'>
			{data.length > 0 ? (
				data.map(item => (
					<SearchItem
						key={item.ref || item.cityRef}
						itemKey={item.ref || item.cityRef}
						value={item[valueName]}
						setValue={setValue}
						item={item}
					/>
				))
			) : (
				<p key='no-results'>{t('Shipping.searchAreaNoResult')}</p>
			)}
		</div>
	)
}

export default SearchArea

