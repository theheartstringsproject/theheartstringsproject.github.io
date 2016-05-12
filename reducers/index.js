import { combineReducers } from 'redux'
import contribution from './contribution'
import payment from './payment'
import navigation from './navigation'

const campaign = combineReducers({
	contribution,
	payment,
	navigation
})

export default campaign