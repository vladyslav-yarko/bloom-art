import { useContext, useEffect, useState } from 'react'

import { OrderContext } from '@/context/OrderContext'
import api from '@/lib/api'


export default function OrderShipping() {
    const [ localities, setLocalities ] = useState([])
	const [ points, setPoints ] = useState([])

    const {
		selectedLocality,
		setSelectedLocality,
		setSelectedPoint,
		selectedPoint
	} = useContext(OrderContext)!


    function filterLocality(data: , value, addValue = null) {
		const cleanData = data.filter(element =>
			element.title.toLowerCase().startsWith(value.toLowerCase())
		)
		return cleanData
	}

	function filterPoint(data, value, cityRef) {
		const cleanData = data.filter(element =>
			element.cityRef === cityRef && element.title.toLowerCase().includes(value.toLowerCase())
		)
		return cleanData
	}+

	useEffect(() => {
		const fetchData = async () => {
			try {
				let responseLocalities = await api.get('/nova/localities/')
				let responsePoints = await api.get('/nova/points/')
				setLocalities(responseLocalities.data.data)
				setPoints(responsePoints.data.data)

			} catch (error) {
				navigate('/')
			}
		}

		fetchData()
	}, [])

	return (
		<div className='orderShipping'>
			<h2 className='mb-2'>Доставка (Нова Пошта)</h2>
		</div>
	)
}
