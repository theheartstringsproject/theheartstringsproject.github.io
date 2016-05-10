import { connect } from 'react-redux'
import * as actions from '../actions'
import CreditCardSecurityCodeInput from '../components/Input/CreditCardSecurityCodeInput'
import * as inputStates from '../constants/InputStates'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: ( value, cursorPosition ) => {
			dispatch( actions.setCreditCardSecurityCode( value, inputStates.VALID, cursorPosition ))
		},
		onFocus: () => {
			dispatch( actions.didStartEditingCreditCardSecurityCode() )
		},
		// onDidFinishEditing: () => {
		// 	dispatch( actions.didFinishEditingCreditCardSecurityCode() )
		// }
	}
}

const DonationCreditCardSecurityCodeInput = connect(
	null,
	mapDispatchToProps,
	null,
	{withRef: true}
)(CreditCardSecurityCodeInput)

export default DonationCreditCardSecurityCodeInput