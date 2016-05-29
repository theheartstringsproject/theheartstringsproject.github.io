const contribution = (state = {}, action) => {

	switch (action.type) {
		case 'CHOOSE_CONTRIBUTION_AMOUNT':
			return Object.assign({}, state, {
				amount: action.amount
			})
		case 'CONFIRM_CONTRIBUTION':
			return state
		default:
			return state
	}
}

export default contribution