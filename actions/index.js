// import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'
import { stripeErrorTypes, stripeErrorCodes } from '../constants/StripeErrors'
import * as views from '../constants/Pages'

export const advancePage = () => {
	return {
		type: types.ADVANCE_PAGE
	}
}

export const recedePage = () => {
	return {
		type: types.RECEDE_PAGE
	}
}

export const jumpToPage = ( page ) => {
	return {
		type: types.JUMP_TO_PAGE,
		page: page
	}	
}

export const jumpToPreviousPage = ( page ) => {
	return {
		type: types.JUMP_TO_PREVIOUS_PAGE
	}
}

export const chooseContributionAmount = ( amount ) => {
	return {
		type: types.CHOOSE_CONTRIBUTION_AMOUNT,
		amount: amount
	}
}

export const confirmContribution = () => {
	return {
		type: types.CONFIRM_CONTRIBUTION
	}
}

export const setEmail = ( email, status ) => {
	return {
		type: types.SET_EMAIL,
		status,
		email
	}
}

export const setCreditCardNumber = ( cardNumber, cardType, formattedCardNumber, status, cardNumberCursorPosition, formState ) => {
	return {
		type: types.SET_CREDIT_CARD_NUMBER,
		status,
		cardNumber,
		cardType,
		formattedCardNumber,
		cardNumberCursorPosition,
		formState
	}
}

export const setCreditCardExpirationDate = ( expirationDate, status, expirationDateCursorPosition ) => {
	return {
		type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
		status,
		expirationDate,
		expirationDateCursorPosition
	}
}

export const setCreditCardSecurityCode = ( securityCode, status, securityCodeCursorPosition ) => {
	return {
		type: types.SET_CREDIT_CARD_SECURITY_CODE,
		status,
		securityCode,
		securityCodeCursorPosition
	}
}

export const didStartEditingCreditCardNumber = () => {
	return {
		type: types.DID_START_EDITING_CREDIT_CARD_NUMBER
	}
}

export const didStartEditingCreditCardExpirationDate = () => {
	return {
		type: types.DID_START_EDITING_CREDIT_CARD_EXPIRATION_DATE
	}
}

export const didStartEditingCreditCardSecurityCode = () => {
	return {
		type: types.DID_START_EDITING_CREDIT_CARD_SECURITY_CODE
	}
}

export const didFinishEditingCreditCardNumber = () => {
	return {
		type: types.DID_FINISH_EDITING_CREDIT_CARD_NUMBER
	}
}

export const setEditingCreditCardNumber = () => {
	return {
		type: types.SET_EDITING_CREDIT_CARD_NUMBER
	}
}

export const setEditingCreditCardExpirationDate = () => {
	return {
		type: types.SET_EDITING_CREDIT_CARD_EXPIRATION_DATE
	}
}

export const setEditingCreditCardSecurityCode = () => {
	return {
		type: types.SET_EDITING_CREDIT_CARD_SECURITY_CODE
	}
}

export const hasAttemptedEmailValidation = () => {
	return {
		type: types.HAS_ATTEMPTED_EMAIL_VALIDATION
	}
}

export const invalidCreditCardNumber = ( error ) => {
	return {
		type: types.INVALID_CREDIT_CARD_NUMBER,
		error
	}
}

export const invalidCreditCardExpirationMonth = ( error ) => {
	return {
		type: types.INVALID_CREDIT_CARD_EXPIRATION_MONTH,
		error
	}
}

export const invalidCreditCardExpirationYear = ( error ) => {
	return {
		type: types.INVALID_CREDIT_CARD_EXPIRATION_YEAR,
		error
	}
}

export const invalidCreditCardSecurityCode = ( error ) => {
	return {
		type: types.INVALID_CREDIT_CARD_SECURITY_CODE,
		error
	}
}

export const incorrectCreditCardNumber = ( error ) => {
	return {
		type: types.INCORRECT_CREDIT_CARD_NUMBER,
		error
	}
}

export const incorrectCreditCardSecurityCode = ( error ) => {
	return {
		type: types.INCORRECT_CREDIT_CARD_SECURITY_CODE,
		error
	}
}

export const expiredCreditCard = ( error ) => {
	return {
		type: types.EXPIRED_CREDIT_CARD,
		error
	}
}

export const declinedCreditCard = ( error ) => {
	return {
		type: types.DECLINED_CREDIT_CARD,
		error
	}
}

export const unrecoverableError = ( error ) => {
	return {
		type: types.UNRECOVERABLE_ERROR,
		error
	}
}

export const requestPaymentToken = () => {
	return {
		type: types.REQUEST_PAYMENT_TOKEN
	}
}

export const paymentTokenReceived = ( response ) => {
	return {
		type: types.PAYMENT_TOKEN_RECEIVED,
		response
	}
}

export const paymentTokenRequestFailed = ( error ) => {
	return function ( dispatch ) {

		// Determine whether this is a card error that the user can fix
		// or something that is out of the user's control
		if ( error.type === stripeErrorTypes.CARD_ERROR ) {

			// Go back to the payment page for any of these errors
			dispatch( jumpToPage( views.pages.indexOf( views.PAYMENT_PAGE ) ))

			switch ( error.code ) {

				case stripeErrorCodes.INVALID_NUMBER:

					// Reveal the card number field
					dispatch( setEditingCreditCardNumber() )

					return dispatch( invalidCreditCardNumber( error ) )
					break

				case stripeErrorCodes.INVALID_EXPIRY_MONTH:

					// Reveal the expiration date field
					dispatch( setEditingCreditCardExpirationDate() )

					return dispatch( invalidCreditCardExpirationMonth( error ) )
					break

				case stripeErrorCodes.INVALID_EXPIRY_YEAR:

					// Reveal the expiration date field
					dispatch( setEditingCreditCardExpirationDate() )

					return dispatch( invalidCreditCardExpirationYear( error ) )
					break

				case stripeErrorCodes.INVALID_CVC:

					// Reveal the security code field
					dispatch( setEditingCreditCardSecurityCode() )

					return dispatch( invalidCreditCardSecurityCode( error ) )
					break

				case stripeErrorCodes.INCORRECT_NUMBER:

					// Reveal the card number field
					dispatch( setEditingCreditCardNumber() )

					return dispatch( incorrectCreditCardNumber( error ) )
					break

				case stripeErrorCodes.INCORRECT_CVC:

					// Reveal the security code field
					dispatch( setEditingCreditCardSecurityCode() )

					return dispatch( incorrectCreditCardSecurityCode( error ) )
					break

				case stripeErrorCodes.EXPIRED_CARD:

					// Reveal the card number field
					dispatch( setEditingCreditCardNumber() )

					return dispatch( expiredCreditCard( error ) )
					break

				case stripeErrorCodes.CARD_DECLINED:

					// Reveal the card number field
					dispatch( setEditingCreditCardNumber() )

					return dispatch( declinedCreditCard( error ) )
					break

				default:

					// Go back to the payment page for any of these errors
					dispatch( jumpToPage( views.pages.indexOf( views.ERROR_PAGE ) ))

					return dispatch( unrecoverableError( error ) )
			}

		} else {

			// Go back to the payment page for any of these errors
			dispatch( jumpToPage( views.pages.indexOf( views.ERROR_PAGE ) ))
			
			return dispatch( unrecoverableError( error ) )
		}
	}
}

export function fetchPaymentToken( payment ) {
	return function( dispatch ) {
		dispatch( requestPaymentToken() )

		// return dispatch( paymentTokenRequestFailed( {
		// 	type: "card_error", // Type of error
  //   		code: "invalid_number", // Optional identifier of specific error
		// } ) )

		Stripe.card.createToken({
			number: payment.cardNumber.value,
			cvc: payment.securityCode.value,
			exp_month: payment.expirationDate.values.month,
			exp_year: payment.expirationDate.values.year
		}, function( status, response ) {
			if ( response.error ) {
				dispatch( paymentTokenRequestFailed( response.error ) )
			} else {
				dispatch( paymentTokenReceived( response ) )
				dispatch( advancePage() )
			}
		})
	}
}