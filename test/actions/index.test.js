import expect from 'expect'
import * as actions from '../../actions/'
import * as types from '../../constants/ActionTypes'
import * as cardStates from '../../constants/CreditCardInputStates'

describe('Actions', function() {

	it('should create an action for setting email', function() {
		const 	email = 'jeremy@lubin.com',
				status = cardStates.VALID
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
				status = cardStates.VALID
		const expectedAction = {
			type: 'SET_CREDIT_CARD_NUMBER',
			status,
			cardNumber,
			formattedCardNumber,
			cardNumberCursorPosition
		}

		expect( actions.setCreditCardNumber( cardNumber, formattedCardNumber, status, cardNumberCursorPosition ) ).toEqual( expectedAction )
	})

	it('should create an action for setting credit card expiration date', function() {
		const 	expirationDate = '12/20',
				expirationDateCursorPosition = '3',
				status = cardStates.VALID
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
				status = cardStates.VALID
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
		const expectAction = {
			type: types.DID_FINISH_EDITING_CREDIT_CARD_NUMBER
		}
	})

	it('should create an action for having attempted email validation', function() {
		const expectedAction = {
			type: types.HAS_ATTEMPTED_EMAIL_VALIDATION
		}

		expect( actions.hasAttemptedEmailValidation() ).toEqual( expectedAction )
	})
})