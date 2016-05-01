import expect from 'expect'
import reducer from '../../reducers/payment'
import * as types from '../../constants/ActionTypes'

describe('Payment Reducer', function() {
	it('should return the initial state', function() {
		expect( reducer( undefined, {} ) ).toEqual({
				email: '',
				cardNumber: '',
				expirationMonth: '',
				expirationYear: '',
				securityCode: ''
		})
	})

	it('should handle SET_CREDIT_CARD_NUMBER', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_NUMBER,
			cardNumber: '123456789012345',
			cardNumberCursorPosition: 2
		})).toEqual({
			cardNumber: '123456789012345',
			cardNumberCursorPosition: 2
		})
	})

	it('should handle SET_CREDIT_CARD_EXPIRATION_DATE', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
			expirationDate: '12/20',
			expirationDateCursorPosition: 2
		})).toEqual({
			expirationMonth: '12',
			expirationYear: '2020',
			expirationDateCursorPosition: 2
		})

		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
			expirationDate: '12/',
			expirationDateCursorPosition: 2
		})).toEqual({
			expirationMonth: '12',
			expirationYear: '',
			expirationDateCursorPosition: 2
		})


	})

	it('should handle SET_CREDIT_CARD_SECURITY_CODE', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_SECURITY_CODE,
			securityCode: '1234',
			securityCodeCursorPosition: 2
		})).toEqual({
			securityCode: '1234',
			securityCodeCursorPosition: 2
		})
	})
})