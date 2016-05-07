import { connect } from 'react-redux'
import * as actions from '../actions'
import CreditCardNumberInput from '../components/Input/CreditCardNumberInput'
import * as cardStates from '../constants/CreditCardInputStates'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: ( value, formattedValue, state, cursorPosition ) => {
			dispatch( actions.setCreditCardNumber( value, formattedValue, state, cursorPosition ))
		},
		onFocus: () => {
			dispatch( actions.didStartEditingCreditCardNumber() )
		},
		onDidFinishEditing: () => {
			dispatch( actions.didFinishEditingCreditCardNumber() )
		}
	}
}

const DonationCreditCardNumberInput = connect(
	null,
	mapDispatchToProps,
	null,
	{withRef: true}
)(CreditCardNumberInput)

export default DonationCreditCardNumberInput