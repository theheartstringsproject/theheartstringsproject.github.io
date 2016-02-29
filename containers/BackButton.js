import { connect } from 'react-redux'
import { recedePage } from '../actions'
import Button from '../components/Button/Button'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(recedePage())
		}
	}
}

const BackButton = connect(
	null,
	mapDispatchToProps
)(Button)

export default BackButton