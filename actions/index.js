// import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'
import { stripeErrorTypes, stripeErrorCodes } from '../constants/StripeErrors'

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

export const setCreditCardNumber = ( cardNumber, formattedCardNumber, status, cardNumberCursorPosition ) => {
	return {
		type: types.SET_CREDIT_CARD_NUMBER,
		status,
		cardNumber,
		formattedCardNumber,
		cardNumberCursorPosition
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

export const setEditingCreditCardExpirationDate = () => {
	return {
		type: types.SET_EDITING_CREDIT_CARD_EXPIRATION_DATE
	}
}

export const hasAttemptedEmailValidation = () => {
	return {
		type: types.HAS_ATTEMPTED_EMAIL_VALIDATION
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
	let action = {
		type: '',
		error
	}

	// Determine whether this is a card error that the user can fix
	// or something that is out of the user's control
	if ( error.type === stripeErrorTypes.CARD_ERROR ) {
		switch ( error.code ) {

			case stripeErrorCodes.INVALID_NUMBER:
				action.type = types.INVALID_CREDIT_CARD_NUMBER
				break

			case stripeErrorCodes.INVALID_EXPIRY_MONTH:
				action.type = types.INVALID_CREDIT_CARD_EXPIRATION_MONTH
				break

			case stripeErrorCodes.INVALID_EXPIRY_YEAR:
				action.type = types.INVALID_CREDIT_CARD_EXPIRATION_YEAR
				break

			case stripeErrorCodes.INVALID_CVC:
				action.type = types.INVALID_CREDIT_CARD_SECURITY_CODE
				break

			case stripeErrorCodes.INCORRECT_NUMBER:
				action.type = types.INCORRECT_CREDIT_CARD_NUMBER
				break

			case stripeErrorCodes.INCORRECT_CVC:
				action.type = types.INCORRECT_CREDIT_CARD_SECURITY_CODE
				break

			case stripeErrorCodes.EXPIRED_CARD:
				action.type = types.EXPIRED_CREDIT_CARD
				break

			case stripeErrorCodes.CARD_DECLINED:
				action.type = types.DECLINED_CREDIT_CARD
				break

			default:
				action.type = types.UNRECOVERABLE_ERROR
		}
	} else {
		action.type = types.UNRECOVERABLE_ERROR
	}

	return action
}

export function fetchPaymentToken( payment ) {
	return function( dispatch ) {
		dispatch( requestPaymentToken() )

		dispatch( paymentTokenRequestFailed( {
			type: "card_error", // Type of error
    		code: "card_declined", // Optional identifier of specific error
		} ) )

		// Stripe.card.createToken({
		// 	number: payment.cardNumber.value,
		// 	cvc: payment.securityCode.value,
		// 	exp_month: payment.expirationDate.values.month,
		// 	exp_year: payment.expirationDate.values.year
		// }, function( status, response ) {
		// 	if ( response.error ) {
		// 		dispatch( paymentTokenRequestFailed( response.error ) )
		// 	} else {
		// 		dispatch( paymentTokenReceived( response ) )
		// 		dispatch( advancePage() )
		// 	}
		// })
	}
}