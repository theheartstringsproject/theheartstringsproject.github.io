import { connect } from 'react-redux'
import * as actions from '../actions'
import CreditCardSecurityCodeInput from '../components/Input/CreditCardSecurityCodeInput'
import * as cardStates from '../constants/CreditCardInputStates'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: ( value, cursorPosition ) => {
			dispatch( actions.setCreditCardSecurityCode( value, cardStates.VALID, cursorPosition ))
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