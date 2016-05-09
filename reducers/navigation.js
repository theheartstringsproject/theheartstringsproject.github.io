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
			// TODO check whether the page is past the last page
			if ( action.page < 0 )
				return state

			return {
				currentPage: action.page,
				previousPage: state.currentPage
			}

		default:
			return state
	}
}

export default navigation