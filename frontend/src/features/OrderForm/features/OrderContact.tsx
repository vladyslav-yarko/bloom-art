"use client"

import { useContext, useEffect } from "react"

import { OrderContext } from "@/context/OrderContext"
import TextField from "@/ui/TextField"


export default function OrderContact() {
    const {
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
        <div className="orderContact">
            <h1>Contact data</h1>
            <TextField placeholder="phone number" value={phoneNumber} setValue={setPhoneNumber}/>
            <TextField placeholder="first name" value={firstName} setValue={setFirstName}/>
            <TextField placeholder="last name" value={lastName} setValue={setLastName}/>
        </div>
    )
}
