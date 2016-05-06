import { connect } from 'react-redux'
import * as actions from '../actions'
import CreditCardExpirationDateInput from '../components/Input/CreditCardExpirationDateInput'
import * as cardStates from '../constants/CreditCardInputStates'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: ( value, cursorPosition ) => {
			dispatch( actions.setCreditCardExpirationDate( value, cardStates.VALID, cursorPosition ))
		},
		onFocus: () => {
			dispatch( actions.didStartEditingCreditCardExpirationDate() )
		},
		// onDidFinishEditing: () => {
		// 	dispatch( actions.didFinishEditingCreditCardExpirationDate() )
		// }
	}
}

const DonationCreditCardExpirationDateInput = connect(
	null,
	mapDispatchToProps,
	null,
	{withRef: true}
)(CreditCardExpirationDateInput)

export default DonationCreditCardExpirationDateInput