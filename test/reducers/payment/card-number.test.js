import expect from 'expect'
import reducer from '../../../reducers/payment/card-number'
import * as types from '../../../constants/ActionTypes'
import * as inputStates from '../../../constants/InputStates'

const initialState = {
	status: '',
	value: '',
	formattedValue: '',
	cursorPosition: null
}

describe('Credit Card Number Reducer', function() {
	it('should return the initial state', function() {
		expect( reducer( undefined, {} ) ).toEqual( initialState )
	})

	it('should handle SET_CREDIT_CARD_NUMBER', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_NUMBER,
			status: inputStates.VALID,
			cardNumber: '1234567890123456',
			formattedCardNumber: '•••• •••• •••• 3456',
			cardNumberCursorPosition: 2
		})).toEqual({
			status: inputStates.VALID,
			value: '1234567890123456',
			formattedValue: '•••• •••• •••• 3456',
			cursorPosition: 2
		})

		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_NUMBER,
			status: inputStates.INVALID,
			cardNumber: '1234',
			formattedCardNumber: '1234',
			cardNumberCursorPosition: 4
		})).toEqual({
			status: inputStates.INVALID,
			value: '1234',
			formattedValue: '1234',
			cursorPosition: 4
		})
	})
})