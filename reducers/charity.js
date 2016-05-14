import * as types from '../constants/ActionTypes'

let initialState = {
	name: '',
	formattedName: '',
	mission: '',
	charityURL: '',
	orgHunterURL: ''
}

const charity = (state = initialState, action) => {

	switch (action.type) {
		case types.SET_CHARITY:
			return Object.assign({}, state, {
				name: action.name,
				formattedName: action.formattedName,
				mission: action.mission,
				charityURL: action.charityURL,
				orgHunterURL: action.orgHunterURL
			})

		default:
			return state
	}
}

export default charity