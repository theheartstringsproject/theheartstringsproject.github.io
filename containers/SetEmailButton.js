import { connect } from 'react-redux'
import { advancePage, hasAttemptedEmailValidation } from '../actions'
import Button from '../components/Button/Button'
import * as inputStates from '../constants/InputStates'

const mapStateToProps = ( state ) => {
	return {
		email: state.payment.email
	}
}

const mapDispatchToProps = ( dispatch ) => {
	return {
		onAdvanceAttempt: ( email ) => {

			// Only advance if the field is valid
			if ( email.status === inputStates.VALID ) {
				dispatch( advancePage() )
			} else {
				dispatch( hasAttemptedEmailValidation() )
			}
		}
	}
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, {
		onClick: () => {
			dispatchProps.onAdvanceAttempt( stateProps.email )
		}
	})
}

const SetEmailButton = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Button)

export default SetEmailButton