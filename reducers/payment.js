import * as types from '../constants/ActionTypes'

let initialState = {
	email: '',
	cardNumber: '',
	expirationMonth: '',
	expirationYear: '',
	securityCode: '',
	cardNumberCursorPosition: null,
	expirationDateCursorPosition: null,
	securityCodeCursorPosition: null,
	currentField: 'CreditCardNumber'
}

const payment = (state = initialState, action) => {

	switch (action.type) {
		case types.SET_EMAIL:
			
			return Object.assign({}, state, {
				email: action.email
			})

		case types.SET_CREDIT_CARD_NUMBER:

			return Object.assign({}, state, {
				cardNumber: action.cardNumber,
				cardNumberCursorPosition: action.cardNumberCursorPosition
			})

		case types.SET_CREDIT_CARD_EXPIRATION_DATE:

			// Split the date into month and year by the slash
			let [ expirationMonth, expirationYear ] = action.expirationDate.split('/')

			// Make sure the month is valid
			expirationMonth = parseInt(expirationMonth) > 12 ? '12' : expirationMonth
			
			// Append the century digits to the year
			// TODO update so this can go higher than 2099
			if ( expirationYear ) {
				expirationYear = '20' + expirationYear
			}

			return Object.assign({}, state, {
				expirationMonth: expirationMonth,
				expirationYear: expirationYear,
				expirationDateCursorPosition: action.expirationDateCursorPosition
			})

		case types.SET_CREDIT_CARD_SECURITY_CODE:

			return Object.assign({}, state, {
				securityCode: action.securityCode,
				securityCodeCursorPosition: action.securityCodeCursorPosition
			})

		case types.DID_START_EDITING_CREDIT_CARD_NUMBER:

			return Object.assign({}, state, {
				currentField: 'CreditCardNumber'
			})

		case types.DID_START_EDITING_CREDIT_CARD_EXPIRATION_DATE:

			return Object.assign({}, state, {
				currentField: 'CreditCardExpirationDate'
			})

		case types.DID_START_EDITING_CREDIT_CARD_SECURITY_CODE:

			return Object.assign({}, state, {
				currentField: 'CreditCardSecurityCode'
			})

		default:
			return state
	}
}

export default payment