'use server'


import { validateName, validatePhoneNumber } from '@/lib/validation'
import { Locality, Point } from '@/types/order'
import { Item } from '@/types/home'


export default async function makeOrder(formData: FormData): Promise<boolean> {
	const phoneNumber = formData.get('phoneNumber') as string
	const firstName = formData.get('firstName') as string
	const lastName = formData.get('lastName') as string

	const rawLocality = formData.get('locality') as string
	const rawPoint = formData.get('point') as string
	const locality: Locality | null = rawLocality ? JSON.parse(rawLocality) : null
	const point: Point | null = rawPoint ? JSON.parse(rawPoint) : null

    const rawItem = formData.get("item") as string
    const item: Item | null = rawItem ? JSON.parse(rawItem) : null

	const errors = {
		phone: validatePhoneNumber(phoneNumber),
		firstName: validateName(firstName, "ім'я"),
		lastName: validateName(lastName, 'прізвище'),
	}
	const contactError = Object.values(errors).some(err => err.length > 0)
	const shippingError = !locality || !point
	if (contactError || shippingError || !item) return false

    const finalPrice = item.price * item.quantity!
    const finalWeight = item.weight * item.quantity!
	const orderData = {
        weight: finalWeight,
        desription: "Парфуми",
        cost: finalPrice,
		cityRecipient: locality.cityRef,
		recipientAddress: point.ref,
		recipientPhone: phoneNumber,
		recipientFirstName: firstName,
		recipientLastName: lastName,
        redeliveryString: finalPrice,
        items: [{
            title: item.title,
            itemPrice: item.price,
            quantity: item.quantity,
            weight: item.weight
        }]
	}

    try {
        const response = await fetch(`${process.env.API_URL}/nova/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
        if (!response.ok) {
            return false
        }
        const result = await response.json()
        return true
    } catch (error) {
        return false
    }

}
