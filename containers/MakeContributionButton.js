import { connect } from 'react-redux'
import { advancePage } from '../actions'
import Button from '../components/Button/Button'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(advancePage())
		}
	}
}

const MakeContributionButton = connect(
	null,
	mapDispatchToProps
)(Button)

export default MakeContributionButton