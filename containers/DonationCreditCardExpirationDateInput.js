import { connect } from 'react-redux'
import * as actions from '../actions'
import CreditCardExpirationDateInput from '../components/Input/CreditCardExpirationDateInput'
import * as inputStates from '../constants/InputStates'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: ( value, state, cursorPosition ) => {
			dispatch( actions.setCreditCardExpirationDate( value, state, cursorPosition ))
		},
		onFocus: () => {
			dispatch( actions.didStartEditingCreditCardExpirationDate() )
		},
		onDidFinishEditing: () => {
			dispatch( actions.didFinishEditingCreditCardExpirationDate() )
		}
	}
}

const DonationCreditCardExpirationDateInput = connect(
	null,
	mapDispatchToProps,
	null,
	{withRef: true}
)(CreditCardExpirationDateInput)

export default DonationCreditCardExpirationDateInput