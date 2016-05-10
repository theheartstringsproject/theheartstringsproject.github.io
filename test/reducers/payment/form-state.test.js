import expect from 'expect'
import reducer from '../../../reducers/payment/form-state'
import * as types from '../../../constants/ActionTypes'
import * as inputStates from '../../../constants/InputStates'
import * as paymentFormStates from '../../../constants/PaymentFormStates'

const initialState = {
	currentField: ''
}

describe('Payment Form State Reducer', function() {
	it('should return the initial state', function() {
		expect( reducer( undefined, {} ) ).toEqual( initialState )
	})

	it('should handle DID_START_EDITING_CREDIT_CARD_NUMBER', function() {
		expect( reducer( [], {
			type: types.DID_START_EDITING_CREDIT_CARD_NUMBER
		})).toEqual({
			currentField: paymentFormStates.CARD_NUMBER
		})
	})

	it('should handle DID_START_EDITING_CREDIT_CARD_EXPIRATION_DATE', function() {
		expect( reducer( [], {
			type: types.DID_START_EDITING_CREDIT_CARD_EXPIRATION_DATE
		})).toEqual({
			currentField: paymentFormStates.EXPIRATION_DATE
		})
	})

	it('should handle DID_START_EDITING_CREDIT_CARD_SECURITY_CODE', function() {
		expect( reducer( [], {
			type: types.DID_START_EDITING_CREDIT_CARD_SECURITY_CODE
		})).toEqual({
			currentField: paymentFormStates.SECURITY_CODE
		})
	})

	it('should handle DID_FINISH_EDITING_CREDIT_CARD_NUMBER', function() {
		expect( reducer( [], {
			type: types.DID_FINISH_EDITING_CREDIT_CARD_NUMBER
		})).toEqual({
			currentField: paymentFormStates.EXPIRATION_DATE
		})
	})


	it('should handle SET_EDITING_CREDIT_CARD_EXPIRATION_DATE', function() {
		expect( reducer( [], {
			type: types.SET_EDITING_CREDIT_CARD_EXPIRATION_DATE
		})).toEqual({
			currentField: paymentFormStates.EXPIRATION_DATE
		})
	})
})