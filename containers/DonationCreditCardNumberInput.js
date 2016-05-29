import { connect } from 'react-redux'
import * as actions from '../actions'
import CreditCardNumberInput from '../components/Input/CreditCardNumberInput'
import * as inputStates from '../constants/InputStates'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: ( value, type, formattedValue, state, cursorPosition, formState ) => {
			dispatch( actions.setCreditCardNumber( value, type, formattedValue, state, cursorPosition, formState ))
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