import * as types from '../../constants/ActionTypes'
import * as inputStates from '../../constants/InputStates'

let initialState = {
	status: '',
	value: '',
	formattedValue: '',
	cursorPosition: null
}

const cardNumber = (state = initialState, action) => {

	switch (action.type) {

		case types.SET_CREDIT_CARD_NUMBER:

			return Object.assign({}, state, {
				status: action.status,
				value: action.cardNumber,
				formattedValue: action.formattedCardNumber,
				cursorPosition: action.cardNumberCursorPosition
			})

		default:
			return state
	}
}

export default cardNumber