import { connect } from 'react-redux'
import { setCardNumber } from '../actions'
import Input from '../components/Input/Input'

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
)(Input)

export default PaymentInput