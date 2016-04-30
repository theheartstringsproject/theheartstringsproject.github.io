export const advancePage = () => {
	return {
		type: 'ADVANCE_PAGE'
	}
}

export const recedePage = () => {
	return {
		type: 'RECEDE_PAGE'
	}
}

export const jumpToPage = ( page ) => {
	return {
		type: 'JUMP_TO_PAGE',
		page: page
	}	
}

export const chooseContributionAmount = ( amount ) => {
	return {
		type: 'CHOOSE_CONTRIBUTION_AMOUNT',
		amount: amount
	}
}

export const confirmContribution = () => {
	return {
		type: 'CONFIRM_CONTRIBUTION'
	}
}

export const setEmail = ( email ) => {
	return {
		type: 'SET_EMAIL',
		email: email
	}
}

export const setCreditCardNumber = ( cardNumber, cardNumberCursorPosition ) => {
	return {
		type: 'SET_CREDIT_CARD_NUMBER',
		cardNumber: cardNumber,
		cardNumberCursorPosition: cardNumberCursorPosition
	}
}

export const setCreditCardExpirationDate = ( expirationDate, expirationDateCursorPosition ) => {
	return {
		type: 'SET_CREDIT_CARD_EXPIRATION_DATE',
		expirationDate: expirationDate,
		expirationDateCursorPosition: expirationDateCursorPosition
	}
}

export const setCreditCardSecurityCode = ( securityCode, securityCodeCursorPosition ) => {
	return {
		type: 'SET_CREDIT_CARD_SECURITY_CODE',
		securityCode: securityCode,
		securityCodeCursorPosition: securityCodeCursorPosition
	}
}