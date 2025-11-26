"use client"

import { useContext, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

import { OrderContext } from '@/context/OrderContext'
import api from '@/lib/api'
import { Locality, Point } from '@/types/order'
import ClearButton from '@/ui/ClearButton'
import SearchSystem from '../components/SearchSystem'


export default function OrderShipping() {
	const t = useTranslations("OrderPage")

    const [ localities, setLocalities ] = useState([])
	const [ points, setPoints ] = useState([])

    const {
			showFlashMessage,
			selectedLocality,
			setSelectedLocality,
			selectedPoint,
			setSelectedPoint,
			localityError,
			setLocalityError,
			pointError,
			setPointError,
		} = useContext(OrderContext)!


    function filterLocality(data: Locality[], value: string) {
		const cleanData = data.filter((element: Locality) =>
			element.title.toLowerCase().startsWith(value.toLowerCase())
		)
		return cleanData
	}

	function filterPoint(data: Point[], value: string, cityRef: string) {
		const cleanData = data.filter((element: Point) =>
			element.cityRef === cityRef && element.title.toLowerCase().includes(value.toLowerCase())
		)
		return cleanData
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				let responseLocalities = await api.get('/nova/localities/')
				let responsePoints = await api.get('/nova/points/')
				setLocalities(responseLocalities.data.data)
				setPoints(responsePoints.data.data)
			} catch (error) {
                console.log(error)
				showFlashMessage()
			}
		}
		fetchData()
	}, [])

	useEffect(() => {
		if (selectedLocality) {
			setLocalityError('')
		} else {
			setLocalityError(t('Shipping.localityError'))
		}
	}, [selectedLocality])

	useEffect(() => {
		if (selectedPoint) {
			setPointError('')
		} else {
			setPointError(t("Shipping.pointError"))
		}
	}, [selectedPoint])

    function clearAllFields() {
		setSelectedLocality(null)
		setSelectedPoint(null)
	}

	return (
		<div className='orderShipping'>
			<h1 className='mb-2'>{t('Shipping.header')}</h1>
			<p className='errorField'>{localityError}</p>
			<p className='errorField'>{pointError}</p>

			<input
				type='hidden'
				name='locality'
				value={selectedLocality ? JSON.stringify(selectedLocality) : ''}
			/>
			<input
				type='hidden'
				name='point'
				value={selectedPoint ? JSON.stringify(selectedPoint) : ''}
			/>

			<div>
				<SearchSystem
					searchItemWarning={t('Shipping.searchItemWarningLocality')}
					searchItemPlaceholder={t('Shipping.searchItemPlaceholderLocality')}
					searchItemId={`nova-locality`}
					data={localities}
					value={selectedLocality}
					setValue={setSelectedLocality}
					valueName={`fullTitle`}
					filterFunction={filterLocality}
					name='localitySearh'
				/>
				{selectedLocality ? (
					<SearchSystem
						searchItemWarning={t('Shipping.searchItemWarningPoint')}
						searchItemPlaceholder={t('Shipping.searchItemPlaceholderPoint')}
						searchItemId={`nova-point`}
						data={points}
						value={selectedPoint}
						setValue={setSelectedPoint}
						valueName={`title`}
						filterFunction={filterPoint}
						name='pointSearch'
						addValue={selectedLocality ? selectedLocality.cityRef : null}
					/>
				) : null}
			</div>

			<div className='orderClearAllIcon' onClick={() => clearAllFields()}>
				<ClearButton />
			</div>
		</div>
	)
}
