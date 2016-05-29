import expect from 'expect'
import reducer from '../../../reducers/payment/security-code'
import * as types from '../../../constants/ActionTypes'
import * as inputStates from '../../../constants/InputStates'

const initialState = {
	status: '',
	value: '',
	cursorPosition: null
}

describe('Credit Card Security Code Reducer', function() {
	it('should return the initial state', function() {
		expect( reducer( undefined, {} ) ).toEqual( initialState )
	})

	it('should handle SET_CREDIT_CARD_SECURITY_CODE', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_SECURITY_CODE,
			status: inputStates.VALID,
			securityCode: '1234',
			securityCodeCursorPosition: 2
		})).toEqual({
			status: inputStates.VALID,
			value: '1234',
			cursorPosition: 2
		})
	})

	it('should handle INVALID_CREDIT_CARD_SECURITY_CODE', function() {
		expect( reducer( [], {
			type: types.INVALID_CREDIT_CARD_SECURITY_CODE
		})).toEqual({
			status: inputStates.INVALID
		})
	})

	it('should handle INCORRECT_CREDIT_CARD_SECURITY_CODE', function() {
		expect( reducer( [], {
			type: types.INCORRECT_CREDIT_CARD_SECURITY_CODE
		})).toEqual({
			status: inputStates.INCORRECT
		})
	})
})