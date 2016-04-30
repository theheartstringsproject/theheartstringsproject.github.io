import { connect } from 'react-redux'
import { setCreditCardNumber, setCreditCardExpirationDate, setCreditCardSecurityCode } from '../actions'
import Input from '../components/Input/Input'
import CreditCardPaymentInput from '../components/Input/CreditCardPaymentInput'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onCardNumberChange: ( e, cursorPosition ) => {
			dispatch( setCreditCardNumber( e.target.value.trim().replace(/ /g, ''), cursorPosition ))
		},
		onExpirationDateChange: ( e, cursorPosition ) => {
			dispatch( setCreditCardExpirationDate ( e.target.value.trim().replace(/\D/g, ''), cursorPosition ))
		},
		onSecurityCodeChange: ( e, cursorPosition ) => {
			dispatch( setCreditCardSecurityCode ( e.target.value.trim().replace(/\D/g, ''), cursorPosition ))
		}
	}
}

const PaymentInput = connect(
	null,
	mapDispatchToProps
)(CreditCardPaymentInput)

export default PaymentInput