import { connect } from 'react-redux'
import { setEmail } from '../actions'
import EmailInput from '../components/Input/EmailInput'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: (value, status ) => {
			dispatch(setEmail( value, status ))
		}
	}
}

const PaymentEmailInput = connect(
	null,
	mapDispatchToProps
)(EmailInput)

export default PaymentEmailInput