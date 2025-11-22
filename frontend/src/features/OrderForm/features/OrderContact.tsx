"use client"

import { useContext, useEffect } from "react"

import { OrderContext } from "@/context/OrderContext"
import TextField from "@/ui/TextField"
import ClearButton from "@/ui/ClearButton"
import { validatePhoneNumber, validateName } from "@/lib/validation"


export default function OrderContact() {
    const {
		item,
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
	} = useContext(OrderContext)!

    useEffect(() => {
		const message = validatePhoneNumber(phoneNumber)
		setPhoneNumberError(message)
	}, [phoneNumber])

	useEffect(() => {
		const message = validateName(firstName, "ім'я")
		setFirstNameError(message)
	}, [firstName])

	useEffect(() => {
		const message = validateName(lastName, "прізвище")
		setLastNameError(message)
	}, [lastName])

    function clearPhoneNumberField() {
		setPhoneNumber('')
	}

    function clearFirstNameField() {
		setFirstName('')
	}

    function clearLastNameField() {
		setLastName('')
	}

	function clearAllFields() {
		setPhoneNumber('')
		setFirstName('')
		setLastName('')
	}

    return (
			<div className='orderContact'>
				<h1 className='mb-2'>Contact data</h1>
				<input
					type='hidden'
					name='item'
					value={item ? JSON.stringify(item) : ''}
				/>
				<div className='orderField'>
					<TextField
						placeholder='phone number'
						value={phoneNumber}
						setValue={setPhoneNumber}
						error={phoneNumberError}
						inputClaseName='orderInput'
						name='phoneNumber'
					/>
					<div
						className='clearFieldIcon'
						onClick={() => clearPhoneNumberField()}
					>
						<ClearButton />
					</div>
				</div>
				<div className='orderField'>
					<TextField
						placeholder='first name'
						value={firstName}
						setValue={setFirstName}
						error={firstNameError}
						inputClaseName='orderInput'
						name='firstName'
					/>
					<div className='clearFieldIcon' onClick={() => clearFirstNameField()}>
						<ClearButton />
					</div>
				</div>
				<div className='orderField'>
					<TextField
						placeholder='last name'
						value={lastName}
						setValue={setLastName}
						error={lastNameError}
						inputClaseName='orderInput'
						name='lastName'
					/>
					<div className='clearFieldIcon' onClick={() => clearLastNameField()}>
						<ClearButton />
					</div>
				</div>
				<div className='orderClearAllIcon' onClick={() => clearAllFields()}>
					<ClearButton />
				</div>
			</div>
		)
}
