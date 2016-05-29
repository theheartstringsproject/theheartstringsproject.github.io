import { connect } from 'react-redux'
import { jumpToPage } from '../actions'
import Button from '../components/Button/Button'
import { PAYMENT_PAGE, pages } from '../constants/Pages'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch( jumpToPage( pages.indexOf( PAYMENT_PAGE ) ) )
		}
	}
}

const BackToPaymentButton = connect(
	null,
	mapDispatchToProps
)(Button)

export default BackToPaymentButton