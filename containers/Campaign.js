import { connect } from 'react-redux'
import { recedePage } from '../actions'
import CampaignView from '../components/CampaignView/CampaignView'

const getCurrentPageName = ( pages, currentPage ) => {
	return pages[ currentPage ]
}

const mapStateToProps = (state, ownProps) => {
	return {
		pageName: getCurrentPageName( state.pages, state.currentPage ),
		contribution: state.contribution
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