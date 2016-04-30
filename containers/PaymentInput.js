import { connect } from 'react-redux'
import { setCardNumber } from '../actions'
import Input from '../components/Input/Input'
import CreditCardPaymentInput from '../components/Input/CreditCardPaymentInput'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: ( e, cursorPosition ) => {
			dispatch(setCardNumber( e.target.value.trim().replace(/ /g, ''), cursorPosition ))
		}
	}
}

const PaymentInput = connect(
	null,
	mapDispatchToProps
)(CreditCardPaymentInput)

export default PaymentInput