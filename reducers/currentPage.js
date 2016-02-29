const currentPage = (state = 0, action) => {

	switch (action.type) {
		case 'ADVANCE_PAGE':

			// TODO: If we're already on the past page, do nothing
			// if ( action.fromPage ==  )
			// 	return state
			return state + 1

		case 'RECEDE_PAGE':

			// If we're already on the first page, do nothing
			if ( state == 0 )
				return state
			return state - 1

		case 'JUMP_TO_PAGE':

			// If this is a valid page
			// TODO check whether the page is past the last page
			if ( action.page < 0 )
				return state
			return action.page

		default:
			return state
	}
}

export default currentPage