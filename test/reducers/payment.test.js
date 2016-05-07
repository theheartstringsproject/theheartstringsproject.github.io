import expect from 'expect'
import reducer from '../../reducers/payment'
import * as types from '../../constants/ActionTypes'
import * as cardStates from '../../constants/CreditCardInputStates'

describe('Payment Reducer', function() {
	it('should return the initial state', function() {
		expect( reducer( undefined, {} ) ).toEqual({
				email: '',
				cardNumber: {
					status: '',
					value: '',
					cursorPosition: null
				},
				expirationDate: {
					status: '',
					values: {
						month: '',
						year: '',
					},
					cursorPosition: null
				},
				securityCode: {
					status: '',
					value: '',
					cursorPosition: null
				},
				currentField: 'CreditCardNumber'
		})
	})

	it('should handle SET_CREDIT_CARD_NUMBER', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_NUMBER,
			status: cardStates.VALID,
			cardNumber: '123456789012345',
			cardNumberCursorPosition: 2
		})).toEqual({
			cardNumber: {
				status: cardStates.VALID,
				value: '123456789012345',
				cursorPosition: 2
			}
		})

		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_NUMBER,
			status: cardStates.INVALID,
			cardNumber: '1234',
			cardNumberCursorPosition: 4
		})).toEqual({
			cardNumber: {
				status: cardStates.INVALID,
				value: '1234',
				cursorPosition: 4
			}
		})


	})

	it('should handle SET_CREDIT_CARD_EXPIRATION_DATE', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
			status: cardStates.VALID,
			expirationDate: '12/20',
			expirationDateCursorPosition: 2
		})).toEqual({
			expirationDate: {
				status: cardStates.VALID,
				values: {
					month: '12',
					year: '2020',
				},
				cursorPosition: 2
			}
		})

		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
			status: cardStates.INVALID,
			expirationDate: '',
			expirationDateCursorPosition: 2
		})).toEqual({
			expirationDate: {
				status: cardStates.INVALID,
				values: {
					month: '',
					year: '',
				},
				cursorPosition: 2
			}
		})

		
	})

	it('should handle SET_CREDIT_CARD_EXPIRATION_DATE without a year', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
			status: cardStates.INVALID,
			expirationDate: '12/',
			expirationDateCursorPosition: 2
		})).toEqual({
			expirationDate: {
				status: cardStates.INVALID,
				values: {
					month: '12',
					year: ''
				},
				cursorPosition: 2
			}
		})
	})

	it('should handle SET_CREDIT_CARD_EXPIRATION_DATE with an invalid month', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
			status: cardStates.INVALID,
			expirationDate: '16/',
			expirationDateCursorPosition: 2
		})).toEqual({
			expirationDate: {
				status: cardStates.INVALID,
				values: {
					month: '12',
					year: ''
				},
				cursorPosition: 2
			}
		})

		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
			status: cardStates.INVALID,
			expirationDate: '43/16',
			expirationDateCursorPosition: 2
		})).toEqual({
			expirationDate: {
				status: cardStates.INVALID,
				values: {
					month: '12',
					year: '2016'
				},
				cursorPosition: 2
			}
		})
	})

	it('should handle SET_CREDIT_CARD_SECURITY_CODE', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_SECURITY_CODE,
			status: cardStates.VALID,
			securityCode: '1234',
			securityCodeCursorPosition: 2
		})).toEqual({
			securityCode: {
				status: cardStates.VALID,
				value: '1234',
				cursorPosition: 2
			}
		})
	})

	it('should handle DID_START_EDITING_CREDIT_CARD_NUMBER', function() {
		expect( reducer( [], {
			type: types.DID_START_EDITING_CREDIT_CARD_NUMBER
		})).toEqual({
			currentField: 'CreditCardNumber'
		})
	})

	it('should handle DID_START_EDITING_CREDIT_CARD_EXPIRATION_DATE', function() {
		expect( reducer( [], {
			type: types.DID_START_EDITING_CREDIT_CARD_EXPIRATION_DATE
		})).toEqual({
			currentField: 'CreditCardExpirationDate'
		})
	})

	it('should handle DID_START_EDITING_CREDIT_CARD_SECURITY_CODE', function() {
		expect( reducer( [], {
			type: types.DID_START_EDITING_CREDIT_CARD_SECURITY_CODE
		})).toEqual({
			currentField: 'CreditCardSecurityCode'
		})
	})

	it('should handle DID_FINISH_EDITING_CREDIT_CARD_NUMBER', function() {
		expect( reducer( [], {
			type: types.DID_FINISH_EDITING_CREDIT_CARD_NUMBER
		})).toEqual({
			currentField: 'CreditCardExpirationDate'
		})
	})
})