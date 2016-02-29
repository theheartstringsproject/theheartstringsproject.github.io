import { combineReducers } from 'redux'
import contribution from './contribution'
import pages from './pages'
import currentPage from './currentPage'

const campaign = combineReducers({
	contribution,
	pages,
	currentPage
})

export default campaign