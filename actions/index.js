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

export const setEmail = ( email ) => {
	return {
		type: types.SET_EMAIL,
		email: email
	}
}

export const setCreditCardNumber = ( cardNumber, cardNumberCursorPosition ) => {
	return {
		type: types.SET_CREDIT_CARD_NUMBER,
		cardNumber: cardNumber,
		cardNumberCursorPosition: cardNumberCursorPosition
	}
}

export const setCreditCardExpirationDate = ( expirationDate, expirationDateCursorPosition ) => {
	return {
		type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
		expirationDate: expirationDate,
		expirationDateCursorPosition: expirationDateCursorPosition
	}
}

export const setCreditCardSecurityCode = ( securityCode, securityCodeCursorPosition ) => {
	return {
		type: types.SET_CREDIT_CARD_SECURITY_CODE,
		securityCode: securityCode,
		securityCodeCursorPosition: securityCodeCursorPosition
	}
}