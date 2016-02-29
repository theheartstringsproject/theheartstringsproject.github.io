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

const NextButton = connect(
	null,
	mapDispatchToProps
)(Button)

export default NextButton