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

export const setCreditCardNumber = ( cardNumber, status, cardNumberCursorPosition ) => {
	return {
		type: types.SET_CREDIT_CARD_NUMBER,
		status,
		cardNumber,
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