'use client'

import { createContext, ReactNode, useState } from 'react'

interface ContextType {
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

	return (
		<OrderContext.Provider
			value={{
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
