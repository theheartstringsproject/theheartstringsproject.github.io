import { combineReducers } from 'redux'
import contribution from './contribution'
import pages from './pages'
import navigation from './navigation'

const campaign = combineReducers({
	contribution,
	pages,
	navigation
})

export default campaign