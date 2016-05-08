import * as types from '../constants/ActionTypes'
import * as cardStates from '../constants/CreditCardInputStates'

let initialState = {
	email: {
		status: '',
		value: '',
		hasAttemptedValidation: false
	},
	cardNumber: {
		status: '',
		value: '',
		formattedValue: '',
		cursorPosition: null
	},
	expirationDate: {
		status: '',
		values: {
			month: '',
			year: '',
		},
		cursorPosition: null
	},
	securityCode: {
		status: '',
		value: '',
		cursorPosition: null
	},
	currentField: 'CreditCardNumber'
}

const payment = (state = initialState, action) => {

	switch (action.type) {
		case types.SET_EMAIL:
			
			return Object.assign({}, state, {
				email: {
					status: action.status,
					value: action.email,
					hasAttemptedValidation: state.email.hasAttemptedValidation
				}
			})

		case types.SET_CREDIT_CARD_NUMBER:

			return Object.assign({}, state, {
				cardNumber: {
					status: action.status,
					value: action.cardNumber,
					formattedValue: action.formattedCardNumber,
					cursorPosition: action.cardNumberCursorPosition
				}
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
			} else {
				expirationYear = ''
			}

			return Object.assign({}, state, {
				expirationDate: {
					status: action.status,
					values: {
						month: expirationMonth,
						year: expirationYear,
					},
					cursorPosition: action.expirationDateCursorPosition
				},
			})

		case types.SET_CREDIT_CARD_SECURITY_CODE:

			return Object.assign({}, state, {
				securityCode: {
					status: action.status,
					value: action.securityCode,
					cursorPosition: action.securityCodeCursorPosition
				}
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

		case types.DID_FINISH_EDITING_CREDIT_CARD_NUMBER:

			return Object.assign({}, state, {
				currentField: 'CreditCardExpirationDate'
			})

		case types.SET_EDITING_CREDIT_CARD_EXPIRATION_DATE:

			return Object.assign({}, state, {
				currentField: 'CreditCardExpirationDate'
			})

		case types.HAS_ATTEMPTED_EMAIL_VALIDATION:

			// Generate a more aggressive state
			// so that the first render after settings
			// this validation attempt will reflect
			// the more aggressive error settings
			let newStatus = state.email.status
			if ( state.email.status === cardStates.BLANK ||
				 state.email.status === cardStates.INCOMPLETE )
			{
				newStatus = cardStates.INVALID
			} 			

			return Object.assign({}, state, {
				email: {
					status: newStatus,
					value: state.email.value,
					hasAttemptedValidation: true
				}
			})

		default:
			return state
	}
}

export default payment