import { connect } from 'react-redux'
import { jumpToPage } from '../actions'
import Button from '../components/Button/Button'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch( jumpToPage(0) )
		}
	}
}

const MakeAnotherContributionButton = connect(
	null,
	mapDispatchToProps
)(Button)

export default MakeAnotherContributionButton