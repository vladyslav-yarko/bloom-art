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

	return (
		<div className='search-area'>
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
				<p key='no-results'>Результатів не знайдено</p>
			)}
		</div>
	)
}

export default SearchArea

