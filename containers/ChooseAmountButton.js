import { connect } from 'react-redux'
import { advancePage, chooseContributionAmount } from '../actions'
import Button from '../components/Button/Button'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(chooseContributionAmount(ownProps.amount))
			dispatch(advancePage())
		}
	}
}

const MakeContributionButton = connect(
	null,
	mapDispatchToProps
)(Button)

export default MakeContributionButton