import { connect } from 'react-redux'
import { advancePage, confirmContribution } from '../actions'
import Button from '../components/Button/Button'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(confirmContribution())
			dispatch(advancePage())
			setTimeout( () => dispatch(advancePage() ), 2000)
		}
	}
}

const ConfirmContributionButton = connect(
	null,
	mapDispatchToProps
)(Button)

export default ConfirmContributionButton