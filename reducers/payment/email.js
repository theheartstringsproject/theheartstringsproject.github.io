import * as types from '../../constants/ActionTypes'
import * as inputStates from '../../constants/InputStates'

let initialState = {
	status: '',
	value: '',
	hasAttemptedValidation: false
}

const securityCode = (state = initialState, action) => {

	switch (action.type) {

		case types.SET_EMAIL:
			
			return Object.assign({}, state, {
				status: action.status,
				value: action.email,
				hasAttemptedValidation: state.hasAttemptedValidation
			})

		case types.HAS_ATTEMPTED_EMAIL_VALIDATION:

			// Generate a more aggressive state
			// so that the first render after settings
			// this validation attempt will reflect
			// the more aggressive error settings
			let newStatus = state.status
			if ( state.status === inputStates.BLANK ||
				 state.status === inputStates.INCOMPLETE )
			{
				newStatus = inputStates.INVALID
			} 			

			return Object.assign({}, state, {
				status: newStatus,
				hasAttemptedValidation: true
			})

		default:
			return state
	}
}

export default securityCode