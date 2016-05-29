import { combineReducers } from 'redux'
import email from './payment/email'
import cardNumber from './payment/card-number'
import expirationDate from './payment/expiration-date'
import securityCode from './payment/security-code'
import formState from './payment/form-state'

const payment = combineReducers({
	email,
	cardNumber,
	expirationDate,
	securityCode,
	formState
})

export default payment