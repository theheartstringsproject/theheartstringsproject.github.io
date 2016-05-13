import * as types from '../../constants/ActionTypes'
import * as inputStates from '../../constants/InputStates'
import * as paymentFormStates from '../../constants/PaymentFormStates'

let initialState = {
	currentField: ''
}

const formState = (state = initialState, action) => {

	switch (action.type) {

		case types.DID_START_EDITING_CREDIT_CARD_NUMBER:

			return Object.assign({}, state, {
				currentField: paymentFormStates.CARD_NUMBER
			})

		case types.DID_START_EDITING_CREDIT_CARD_EXPIRATION_DATE:

			return Object.assign({}, state, {
				currentField: paymentFormStates.EXPIRATION_DATE
			})

		case types.DID_START_EDITING_CREDIT_CARD_SECURITY_CODE:

			return Object.assign({}, state, {
				currentField: paymentFormStates.SECURITY_CODE
			})

		case types.DID_FINISH_EDITING_CREDIT_CARD_NUMBER:

			return Object.assign({}, state, {
				currentField: paymentFormStates.EXPIRATION_DATE
			})

		case types.SET_EDITING_CREDIT_CARD_NUMBER:

			return Object.assign({}, state, {
				currentField: paymentFormStates.CARD_NUMBER
			})

		case types.SET_EDITING_CREDIT_CARD_EXPIRATION_DATE:

			return Object.assign({}, state, {
				currentField: paymentFormStates.EXPIRATION_DATE
			})

		case types.SET_EDITING_CREDIT_CARD_SECURITY_CODE:

			return Object.assign({}, state, {
				currentField: paymentFormStates.SECURITY_CODE
			})

		default:
			return state
	}
}

export default formState