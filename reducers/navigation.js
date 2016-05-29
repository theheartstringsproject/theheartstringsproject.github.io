import * as types from '../constants/ActionTypes'
import * as views from '../constants/Pages'

let initialState = {
	currentPage: 0,
	previousPage: 0
}

const navigation = (state = initialState, action) => {

	switch (action.type) {
		case 'ADVANCE_PAGE':

			// TODO: If we're already on the past page, do nothing
			// if ( action.fromPage ==  )
			// 	return state
			
			return {
				currentPage: state.currentPage + 1,
				previousPage: state.currentPage
			}

		case 'RECEDE_PAGE':

			// If we're already on the first page, do nothing
			if ( state.currentPage == 0 )
				return state

			return {
				currentPage: state.currentPage - 1,
				previousPage: state.currentPage
			}

		case 'JUMP_TO_PAGE':

			// If this is a valid page
			if ( action.page < 0 || action.page === views.pages.length )
				return state

			return {
				currentPage: action.page,
				previousPage: state.currentPage
			}

		case 'JUMP_TO_PREVIOUS_PAGE':

			return {
				currentPage: state.previousPage,
				previousPage: state.currentPage
			}

		case types.DECLINED_CREDIT_CARD:

			return {
				currentPage: views.pages.indexOf( views.PAYMENT_PAGE ),
				previousPage: state.currentPage
			}

		case types.REQUEST_PAYMENT_TOKEN:

			return {
				currentPage: views.pages.indexOf( views.LOADING_PAGE ),
				previousPage: state.currentPage
			}

		default:
			return state
	}
}

export default navigation