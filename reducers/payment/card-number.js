import * as types from '../../constants/ActionTypes'
import * as inputStates from '../../constants/InputStates'

let initialState = {
	status: '',
	value: '',
	type: '',
	formattedValue: '',
	cursorPosition: null
}

const cardNumber = (state = initialState, action) => {

	switch (action.type) {

		case types.SET_CREDIT_CARD_NUMBER:

			return Object.assign({}, state, {
				status: action.status,
				value: action.cardNumber,
				type: action.cardType,
				formattedValue: action.formattedCardNumber,
				cursorPosition: action.cardNumberCursorPosition
			})

		case types.INVALID_CREDIT_CARD_NUMBER:

			return Object.assign({}, state, {
				status: inputStates.INVALID
			})

		case types.INCORRECT_CREDIT_CARD_NUMBER:

			return Object.assign({}, state, {
				status: inputStates.INCORRECT
			})

		case types.EXPIRED_CREDIT_CARD:

			return Object.assign({}, state, {
				status: inputStates.EXPIRED
			})

		case types.DECLINED_CREDIT_CARD:

			return Object.assign({}, state, {
				status: inputStates.DECLINED
			})

		default:
			return state
	}
}

export default cardNumber