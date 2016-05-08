import { connect } from 'react-redux'
import * as actions from '../actions'
import CreditCardPaymentInput from '../components/Input/CreditCardPaymentInput'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onCardNumberChange: ( value, cursorPosition ) => {
			dispatch( actions.setCreditCardNumber( value, cursorPosition ))
		},
		onExpirationDateChange: ( value, cursorPosition ) => {
			dispatch( actions.setCreditCardExpirationDate ( value, cursorPosition ))
		},
		onSecurityCodeChange: ( value, cursorPosition ) => {
			dispatch( actions.setCreditCardSecurityCode ( value, cursorPosition ))
		},
		onCardNumberFocus: () => {
			dispatch( actions.didStartEditingCreditCardNumber() )
		},
		onExpirationDateFocus: () => {
			dispatch( actions.didStartEditingCreditCardExpirationDate() )
		},
		onSecurityCodeFocus: () => {
			dispatch( actions.didStartEditingCreditCardSecurityCode() )
		}
	}
}

const PaymentInput = connect(
	null,
	mapDispatchToProps
)(CreditCardPaymentInput)

export default PaymentInput