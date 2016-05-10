import * as types from '../../constants/ActionTypes'
import * as inputStates from '../../constants/InputStates'

let initialState = {
	status: '',
	values: {
		month: '',
		year: '',
	},
	cursorPosition: null
}

const expirationDate = (state = initialState, action) => {

	switch (action.type) {

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
				status: action.status,
				values: {
					month: expirationMonth,
					year: expirationYear,
				},
				cursorPosition: action.expirationDateCursorPosition
			})

		default:
			return state
	}
}

export default expirationDate