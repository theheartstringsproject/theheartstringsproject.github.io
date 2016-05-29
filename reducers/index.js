import { combineReducers } from 'redux'
import charity from './charity'
import contribution from './contribution'
import payment from './payment'
import navigation from './navigation'

const campaign = combineReducers({
	charity,
	contribution,
	payment,
	navigation
})

export default campaign