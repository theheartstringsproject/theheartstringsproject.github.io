import { connect } from 'react-redux'
import { jumpToPage } from '../actions'
import Button from '../components/Button/Button'
import { INFO_PAGE, pages } from '../constants/Pages'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch( jumpToPage( pages.indexOf( INFO_PAGE ) ))
		}
	}
}

const InfoButton = connect(
	null,
	mapDispatchToProps
)(Button)

export default InfoButton