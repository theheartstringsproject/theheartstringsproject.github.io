import { connect } from 'react-redux'
import { advancePage, confirmContribution, fetchPaymentToken } from '../actions'
import Button from '../components/Button/Button'

const mapStateToProps = ( state ) => {
	return {
		payment: state.payment,
		contribution: state.contribution
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onConfirmPaymentClick: ( payment, contribution ) => {
			dispatch( fetchPaymentToken( payment, contribution ) )

			// dispatch(confirmContribution())
			// setTimeout( () => dispatch(advancePage() ), 2000)
		}
	}
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, {
		onClick: () => {
			dispatchProps.onConfirmPaymentClick( stateProps.payment, stateProps.contribution )
		}
	})
}

const ConfirmContributionButton = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Button)

export default ConfirmContributionButton
