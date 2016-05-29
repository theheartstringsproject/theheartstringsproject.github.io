import { connect } from 'react-redux'
import { jumpToPreviousPage } from '../actions'
import Button from '../components/Button/Button'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch( jumpToPreviousPage() )
		}
	}
}

const BackButton = connect(
	null,
	mapDispatchToProps
)(Button)

export default BackButton