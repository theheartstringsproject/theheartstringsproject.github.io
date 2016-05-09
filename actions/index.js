// import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'

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

export const paymentTokenRequestFailed = ( error ) => {
	return {
		type: types.PAYMENT_TOKEN_REQUEST_FAILED,
		error
	}
}

export const paymentTokenReceived = ( response ) => {
	return {
		type: types.PAYMENT_TOKEN_RECEIVED,
		response
	}
}

export function fetchPaymentToken( payment ) {
	return function( dispatch ) {
		dispatch( requestPaymentToken() )

		Stripe.card.createToken({
			number: payment.cardNumber.value,
			cvc: payment.securityCode.value,
			exp_month: payment.expirationDate.values.month,
			exp_year: payment.expirationDate.values.year
		}, function( status, response ) {
			if ( response.error ) {
				console.log( response.error )
				dispatch( paymentTokenRequestFailed( response.error ) )
			} else {
				console.log( response )
				dispatch( paymentTokenReceived( response ) )
				dispatch( advancePage() )
			}
		})
	}
}