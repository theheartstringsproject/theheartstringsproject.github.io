import expect from 'expect'
import * as actions from '../../actions/'
import * as types from '../../constants/ActionTypes'
import * as inputStates from '../../constants/InputStates'

describe('Actions', function() {

	describe('Navigation Actions', function() {
		it('should create an action for advanging a page', function() {
			const expectedAction = {
				type: types.ADVANCE_PAGE
			}
			expect( actions.advancePage() ).toEqual( expectedAction )
		})

		it('should create an action for receding a page', function() {
			const expectedAction = {
				type: types.RECEDE_PAGE
			}
			expect( actions.recedePage() ).toEqual( expectedAction )
		})

		it('should create an action for jumping to a page', function() {
			const page = 7
			const expectedAction = {
				type: types.JUMP_TO_PAGE,
				page
			}
			expect( actions.jumpToPage( page ) ).toEqual( expectedAction )
		})

		it('should create an action for jumping to the previous page', function() {
			const expectedAction = {
				type: types.JUMP_TO_PREVIOUS_PAGE
			}
			expect( actions.jumpToPreviousPage() ).toEqual( expectedAction )
		})
	})

	it('should create an action for setting email', function() {
		const 	email = 'jeremy@lubin.com',
				status = inputStates.VALID
		const 	expectedAction = {
			type: 'SET_EMAIL',
			status,
			email
		}

		expect( actions.setEmail( email, status ) ).toEqual( expectedAction )
	})

	it('should create an action for setting credit card number', function() {
		const 	cardNumber = '1234567891098876',
				formattedCardNumber = '•••• •••• •••• 8876',
				cardNumberCursorPosition = '3',
				cardType = 'amex',
				status = inputStates.VALID,
				formState = {}
		const expectedAction = {
			type: 'SET_CREDIT_CARD_NUMBER',
			status,
			cardNumber,
			cardType,
			formattedCardNumber,
			cardNumberCursorPosition,
			formState
		}

		expect( actions.setCreditCardNumber( cardNumber, cardType, formattedCardNumber, status, cardNumberCursorPosition, formState ) ).toEqual( expectedAction )
	})

	it('should create an action for setting credit card expiration date', function() {
		const 	expirationDate = '12/20',
				expirationDateCursorPosition = '3',
				status = inputStates.VALID
		const expectedAction = {
			type: 'SET_CREDIT_CARD_EXPIRATION_DATE',
			status,
			expirationDate,
			expirationDateCursorPosition
		}

		expect( actions.setCreditCardExpirationDate( expirationDate, status, expirationDateCursorPosition ) ).toEqual( expectedAction )
	})

	it('should create an action for setting credit card security code', function() {
		const 	securityCode = '1220',
				securityCodeCursorPosition = '3',
				status = inputStates.VALID
		const expectedAction = {
			type: 'SET_CREDIT_CARD_SECURITY_CODE',
			status,
			securityCode,
			securityCodeCursorPosition
		}

		expect( actions.setCreditCardSecurityCode( securityCode, status, securityCodeCursorPosition ) ).toEqual( expectedAction )
	})

	it('should create an action for beginning to edit the credit card number', function() {
		const expectedAction = {
			type: types.DID_START_EDITING_CREDIT_CARD_NUMBER
		}

		expect( actions.didStartEditingCreditCardNumber() ).toEqual( expectedAction )
	})

	it('should create an action for beginning to edit the credit card expiration date', function() {
		const expectedAction = {
			type: types.DID_START_EDITING_CREDIT_CARD_EXPIRATION_DATE
		}

		expect( actions.didStartEditingCreditCardExpirationDate() ).toEqual( expectedAction )
	})

	it('should create an action for beginning to edit the credit card security code', function() {
		const expectedAction = {
			type: types.DID_START_EDITING_CREDIT_CARD_SECURITY_CODE
		}

		expect( actions.didStartEditingCreditCardSecurityCode() ).toEqual( expectedAction )
	})

	it('should create an action for ending credit card number editing', function() {
		const expectedAction = {
			type: types.DID_FINISH_EDITING_CREDIT_CARD_NUMBER
		}

		expect( actions.didFinishEditingCreditCardNumber() ).toEqual( expectedAction )
	})

	it('should create an action for setting editing to expiration date', function() {
		const expectedAction = {
			type: types.SET_EDITING_CREDIT_CARD_EXPIRATION_DATE
		}

		expect( actions.setEditingCreditCardExpirationDate() ).toEqual( expectedAction )
	})

	it('should create an action for setting editing to security code', function() {
		const expectedAction = {
			type: types.SET_EDITING_CREDIT_CARD_SECURITY_CODE
		}

		expect( actions.setEditingCreditCardSecurityCode() ).toEqual( expectedAction )
	})

	it('should create an action for having attempted email validation', function() {
		const expectedAction = {
			type: types.HAS_ATTEMPTED_EMAIL_VALIDATION
		}

		expect( actions.hasAttemptedEmailValidation() ).toEqual( expectedAction )
	})

	it('should create an action for an invalid credit card number', function() {
		const error = {}
		const expectedAction = {
			type: types.INVALID_CREDIT_CARD_NUMBER,
			error
		}

		expect( actions.invalidCreditCardNumber( error ) ).toEqual( expectedAction )
	})

	it('should create an action for an invalid credit card expiration month', function() {
		const error = {}
		const expectedAction = {
			type: types.INVALID_CREDIT_CARD_EXPIRATION_MONTH,
			error
		}

		expect( actions.invalidCreditCardExpirationMonth( error ) ).toEqual( expectedAction )
	})

	it('should create an action for an invalid credit card expiration year', function() {
		const error = {}
		const expectedAction = {
			type: types.INVALID_CREDIT_CARD_EXPIRATION_YEAR,
			error
		}

		expect( actions.invalidCreditCardExpirationYear( error ) ).toEqual( expectedAction )
	})

	it('should create an action for an invalid credit card security code', function() {
		const error = {}
		const expectedAction = {
			type: types.INVALID_CREDIT_CARD_SECURITY_CODE,
			error
		}

		expect( actions.invalidCreditCardSecurityCode( error ) ).toEqual( expectedAction )
	})

	it('should create an action for an incorrect credit card number', function() {
		const error = {}
		const expectedAction = {
			type: types.INCORRECT_CREDIT_CARD_NUMBER,
			error
		}

		expect( actions.incorrectCreditCardNumber( error ) ).toEqual( expectedAction )
	})

	it('should create an action for an incorrect credit card security code', function() {
		const error = {}
		const expectedAction = {
			type: types.INCORRECT_CREDIT_CARD_SECURITY_CODE,
			error
		}

		expect( actions.incorrectCreditCardSecurityCode( error ) ).toEqual( expectedAction )
	})

	it('should create an action for an expired credit card', function() {
		const error = {}
		const expectedAction = {
			type: types.EXPIRED_CREDIT_CARD,
			error
		}

		expect( actions.expiredCreditCard( error ) ).toEqual( expectedAction )
	})

	it('should create an action for a declined credit card', function() {
		const error = {}
		const expectedAction = {
			type: types.DECLINED_CREDIT_CARD,
			error
		}

		expect( actions.declinedCreditCard( error ) ).toEqual( expectedAction )
	})

	it('should create an action for an unrecoverable error', function() {
		const error = {}
		const expectedAction = {
			type: types.UNRECOVERABLE_ERROR,
			error
		}

		expect( actions.unrecoverableError( error ) ).toEqual( expectedAction )
	})

	it('should create an action for requesting a payment token', function() {
		const expectedAction = {
			type: types.REQUEST_PAYMENT_TOKEN
		}

		expect( actions.requestPaymentToken() ).toEqual( expectedAction )
	})

	// it('should create an action for a failed payment token request', function() {
	// 	const error = {}
	// 	const expectedAction = {
	// 		type: types.PAYMENT_TOKEN_REQUEST_FAILED,
	// 		error
	// 	}

	// 	expect( actions.paymentTokenRequestFailed( error ) ).toEqual( expectedAction )
	// })

	it('should create an action for a successful payment token request', function() {
		const response = {}
		const expectedAction = {
			type: types.PAYMENT_TOKEN_RECEIVED,
			response
		}

		expect( actions.paymentTokenReceived( response ) ).toEqual( expectedAction )
	})
})