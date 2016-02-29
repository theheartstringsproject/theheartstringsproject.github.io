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