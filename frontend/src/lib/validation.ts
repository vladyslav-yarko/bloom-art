import { parsePhoneNumberFromString } from "libphonenumber-js"

import { capitalize } from "./helpers"


function validateName(name: string, nameType: string, error1: string, error2: string) {
    if (!name || name.length === 0) {
			return capitalize(`${nameType} ${error1}`)
		}
    const regexPatter = /^\p{L}+$/u
    let nameValidate = regexPatter.test(name)
    if (!nameValidate || name.length < 1 || name.length > 30) {
			return `${error2} ${nameType}`
		}
    return ""
}


function validatePhoneNumber(phoneNumber: string, error1: string, error2: string) {
	if (!phoneNumber || phoneNumber.length === 0) {
		return error1
	}
    const validatedPhoneNumber = parsePhoneNumberFromString(phoneNumber)
	if (!validatedPhoneNumber?.isValid()) {
		return error2
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
