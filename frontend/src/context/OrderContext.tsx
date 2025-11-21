'use client'


import { useContext, createContext, ReactNode, useEffect, useState, use } from 'react'

import { useRouter } from '@/i18n/navigation'
import { Item } from '@/types/home'
import { GlobalContext } from './GlobalContext'


interface ContextType {
	item: Item | null
	setItem: React.Dispatch<React.SetStateAction<Item | null>>

	title: string
	setTitle: React.Dispatch<React.SetStateAction<string>>

	price: string
	setPrice: React.Dispatch<React.SetStateAction<string>>

	currency: string
	setCurrency: React.Dispatch<React.SetStateAction<string>>

	weight: string | null
	setWeight: React.Dispatch<React.SetStateAction<string | null>>

	description: string | null
	setDescription: React.Dispatch<React.SetStateAction<string | null>>

	items: string | null
	setItems: React.Dispatch<React.SetStateAction<string | null>>

	phoneNumber: string
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>

	firstName: string
	setFirstName: React.Dispatch<React.SetStateAction<string>>

	lastName: string
	setLastName: React.Dispatch<React.SetStateAction<string>>

	firstNameError: string
	setFirstNameError: React.Dispatch<React.SetStateAction<string>>

	lastNameError: string
	setLastNameError: React.Dispatch<React.SetStateAction<string>>

	phoneNumberError: string
	setPhoneNumberError: React.Dispatch<React.SetStateAction<string>>

	selectedLocality: string | null
	setSelectedLocality: React.Dispatch<React.SetStateAction<string | null>>

	selectedPoint: string | null
	setSelectedPoint: React.Dispatch<React.SetStateAction<string | null>>

	localityError: string
	setLocalityError: React.Dispatch<React.SetStateAction<string>>

	pointError: string
	setPointError: React.Dispatch<React.SetStateAction<string>>
}


interface Props {
	children: ReactNode
}


export const OrderContext = createContext<ContextType | undefined>(undefined)


export const OrderContextProvider = ({ children }: Props) => {
	const router = useRouter()

	const { setOrderAction, setOrderCreated } = useContext(GlobalContext)!

	const [ item, setItem ] = useState<Item | null>(null)

	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const [currency, setCurrency] = useState('')

	const [weight, setWeight] = useState<string | null>(null)
	const [description, setDescription] = useState<string | null>(null)
	const [items, setItems] = useState<string | null>(null)

	const [phoneNumber, setPhoneNumber] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	const [firstNameError, setFirstNameError] = useState('')
	const [lastNameError, setLastNameError] = useState('')
	const [phoneNumberError, setPhoneNumberError] = useState('')

	const [selectedLocality, setSelectedLocality] = useState<string | null>(null)
	const [selectedPoint, setSelectedPoint] = useState<string | null>(null)

	const [localityError, setLocalityError] = useState('')
	const [pointError, setPointError] = useState('')

	useEffect(() => {
		const orderKey = process.env.NEXT_PUBLIC_ORDER_KEY!
		const storedItem = localStorage.getItem(orderKey)

		const showFlashMessage = () => {
			setOrderAction(true)
			setOrderCreated(false)
			router.push('/')
			setTimeout(() => {
				setOrderAction(false)
			}, 4000)
		}

		if (!storedItem) {
			showFlashMessage()
			return
		}
		let orderData
		try {
			orderData = JSON.parse(storedItem) as Item
		} catch {
			showFlashMessage()
			return
		}
		setItem(orderData)
	}, [])

	return (
		<OrderContext.Provider
			value={{
				item,
				setItem,

				title,
				setTitle,
				price,
				setPrice,
				currency,
				setCurrency,

				weight,
				setWeight,
				description,
				setDescription,
				items,
				setItems,

				phoneNumber,
				setPhoneNumber,
				firstName,
				setFirstName,
				lastName,
				setLastName,

				firstNameError,
				setFirstNameError,
				lastNameError,
				setLastNameError,
				phoneNumberError,
				setPhoneNumberError,

				selectedLocality,
				setSelectedLocality,
				selectedPoint,
				setSelectedPoint,

				localityError,
				setLocalityError,
				pointError,
				setPointError,
			}}
		>
			{children}
		</OrderContext.Provider>
	)
}
