import { connect } from 'react-redux'
import { recedePage } from '../actions'
import CampaignView from '../components/CampaignView/CampaignView'
import { pages } from '../constants/Pages'

const getCurrentPageName = ( currentPage ) => {
	return pages[ currentPage ]
}

const getNavigationDirection = ( currentPage, previousPage ) => {
	return currentPage - previousPage > 0 ? 'next' : 'prev'
}

const mapStateToProps = (state, ownProps) => {
	return {
		pageName: getCurrentPageName( state.navigation.currentPage ),
		previousPageName: getCurrentPageName( state.navigation.previousPage ),
		direction: getNavigationDirection( state.navigation.currentPage, state.navigation.previousPage ),
		charity: state.charity,
		contribution: state.contribution,
		payment: state.payment
	}
}

const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onClick: () => {
			dispatch( recedePage() )
		}
	}
}

const Campaign = connect(
	mapStateToProps,
	mapDispatchToProps
)(CampaignView)

export default Campaign