import { connect } from 'react-redux'
import { setEmail } from '../actions'
import Input from '../components/Input/Input'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onChange: (e) => {
			dispatch(setEmail( e.target.value.trim() ))
		}
	}
}

const EmailInput = connect(
	null,
	mapDispatchToProps
)(Input)

export default EmailInput