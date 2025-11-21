import { parsePhoneNumberFromString } from "libphonenumber-js"

import { capitalize } from "./helpers"


function validateName(name: string, nameType: string) {
    if (!name || name.length === 0) {
			return capitalize(`${nameType} не може бути порожнім`)
		}
    const regexPatter = /^\p{L}+$/u
    let nameValidate = regexPatter.test(name)
    if (!nameValidate || name.length < 1 || name.length > 30) {
			return `Недійсне ${nameType}`
		}
    return ""
}


function validatePhoneNumber(phoneNumber: string) {
	if (!phoneNumber || phoneNumber.length === 0) {
		return 'Номер телефону не може бути порожнім'
	}
    const validatedPhoneNumber = parsePhoneNumberFromString(phoneNumber)
	if (!validatedPhoneNumber?.isValid()) {
		return 'Недійсний номер телефону'
	}
	return ''
}


// function validatePhoneNumber(phoneNumber) {
//     if (!phoneNumber || phoneNumber.length === 0) {
//         return 'Номер телефону не може бути порожнім'
//     }
//     // const regexPattern = /(\+?\d{1,3}[- ]?)?(\(?\d{2,4}\)?[- ]?)?\d{3,4}[- ]?\d{4}$/
//     const regexPattern = /+{}/
//     let isValidNumber = regexPattern.test(phoneNumber)
//     if (!isValidNumber) {
//         return 'Недійсний номер телефону'
//     }
//     return ""
// }


export { validateName, validatePhoneNumber }
