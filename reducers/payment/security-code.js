import * as types from '../../constants/ActionTypes'
import * as inputStates from '../../constants/InputStates'

let initialState = {
	status: '',
	value: '',
	cursorPosition: null
}

const securityCode = (state = initialState, action) => {

	switch (action.type) {

		case types.SET_CREDIT_CARD_SECURITY_CODE:

			return Object.assign({}, state, {
				status: action.status,
				value: action.securityCode,
				cursorPosition: action.securityCodeCursorPosition
			})

		case types.INVALID_CREDIT_CARD_SECURITY_CODE:

			return Object.assign({}, state, {
				status: inputStates.INVALID
			})

		case types.INCORRECT_CREDIT_CARD_SECURITY_CODE:

			return Object.assign({}, state, {
				status: inputStates.INCORRECT
			})

		default:
			return state
	}
}

export default securityCode