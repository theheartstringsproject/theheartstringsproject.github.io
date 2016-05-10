import expect from 'expect'
import reducer from '../../../reducers/payment/email'
import * as types from '../../../constants/ActionTypes'
import * as inputStates from '../../../constants/InputStates'

const initialState = {
	status: '',
	value: '',
	hasAttemptedValidation: false
}

describe('Payment Email Reducer', function() {
	it('should return the initial state', function() {
		expect( reducer( undefined, {} ) ).toEqual( initialState )
	})

	it('should handle SET_EMAIL', function() {
		expect( reducer( initialState, {
			type: types.SET_EMAIL,
			status: inputStates.VALID,
			email: 'jeremy@lubin.com'
		})).toEqual(Object.assign({}, initialState, {
			status: inputStates.VALID,
			value: 'jeremy@lubin.com',
			hasAttemptedValidation: false
		}))
	})

	it('should handle HAS_ATTEMPTED_EMAIL_VALIDATION', function() {
		let newState = Object.assign({}, initialState, {
			status: inputStates.INCOMPLETE,
		})
		expect( reducer( newState, {
			type: types.HAS_ATTEMPTED_EMAIL_VALIDATION
		})).toEqual({
			status: inputStates.INVALID,
			value: '',
			hasAttemptedValidation: true
		})
	})
})