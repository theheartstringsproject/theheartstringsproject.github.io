import expect from 'expect'
import * as actions from '../../actions/'

describe('Actions', function() {

	it('should create an action for setting credit card number', function() {
		const 	cardNumber = '1234567891098876',
				cardNumberCursorPosition = '3'
		const expectedAction = {
			type: 'SET_CREDIT_CARD_NUMBER',
			cardNumber,
			cardNumberCursorPosition
		}

		expect( actions.setCreditCardNumber( cardNumber, cardNumberCursorPosition ) ).toEqual( expectedAction )
	})

	it('should create an action for setting credit card expiration date', function() {
		const 	expirationDate = '1220',
				expirationDateCursorPosition = '3'
		const expectedAction = {
			type: 'SET_CREDIT_CARD_EXPIRATION_DATE',
			expirationDate,
			expirationDateCursorPosition
		}

		expect( actions.setCreditCardExpirationDate( expirationDate, expirationDateCursorPosition ) ).toEqual( expectedAction )
	})

	it('should create an action for setting credit card security code', function() {
		const 	securityCode = '1220',
				securityCodeCursorPosition = '3'
		const expectedAction = {
			type: 'SET_CREDIT_CARD_SECURITY_CODE',
			securityCode,
			securityCodeCursorPosition
		}

		expect( actions.setCreditCardSecurityCode( securityCode, securityCodeCursorPosition ) ).toEqual( expectedAction )
	})
})