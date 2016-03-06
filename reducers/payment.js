let initialState = {
	email: '',
	cardNumber: '',
	expirationDate: '',
	securityCode: ''
}

const payment = (state = initialState, action) => {

	switch (action.type) {
		case 'SET_EMAIL':
			
			return Object.assign({}, state, {
				email: action.email
			})

		case 'SET_CARD_NUMBER':

			return Object.assign({}, state, {
				cardNumber: action.cardNumber,
				cardCursorPosition: action.cardCursorPosition
			})

		case 'SET_EXPIRATION_DATE':

			return Object.assign({}, state, {
				expirationDate: action.expirationDate
			})

		case 'SET_SECURITY_CODE':

			return Object.assign({}, state, {
				securityCode: action.securityCode
			})

		default:
			return state
	}
}

export default payment