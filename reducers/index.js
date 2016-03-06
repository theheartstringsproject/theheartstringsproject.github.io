import { combineReducers } from 'redux'
import contribution from './contribution'
import payment from './payment'
import pages from './pages'
import navigation from './navigation'

const campaign = combineReducers({
	contribution,
	payment,
	pages,
	navigation
})

export default campaign