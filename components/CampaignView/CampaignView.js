import React from 'react'
import './campaign.css'
import WorldMap from '../WorldMap/WorldMap'
import LandingPage from '../pages/LandingPage'
import ContributionPage from '../pages/ContributionPage'
import EmailPage from '../pages/EmailPage'
import PaymentPage from '../pages/PaymentPage'
import ConfirmationPage from '../pages/ConfirmationPage'
import LoadingPage from '../pages/LoadingPage'
import ThanksPage from '../pages/ThanksPage'
		
// const CampaignView = (Props) => (
// 	<div className='Campaign'>
// 		<WorldMap />
// 		<Props.PageName charityName={Props.charityName} reason={Props.reason} />	
// 	</div>
// )
const CampaignView = React.createClass ({

	getPageComponent: function() {
		let charityName = this.props.contribution.charityName
		let reason = this.props.contribution.reason
		let amount = this.props.contribution.amount

		switch( this.props.pageName ) {
			case 'LandingPage':
				return <LandingPage charityName={charityName} reason={reason} />
			case 'ContributionPage':
				return <ContributionPage charityName={charityName} reason={reason} />
			case 'EmailPage':
				return <EmailPage charityName={charityName} amount={amount}/>
			case 'PaymentPage':
				return <PaymentPage charityName={charityName} amount={amount}/>
			case 'ConfirmationPage':
				return <ConfirmationPage charityName={charityName} amount={amount}/>
			case 'LoadingPage':
				return <LoadingPage />
			case 'ThanksPage':
				return <ThanksPage />
			default: /* TODO Update to return error page */
				return <LandingPage charityName={charityName} reason={reason} />
		}
	},

	render: function() {		
		return (
			<div className='Campaign'>
				<WorldMap />
				{this.getPageComponent()}
			</div>
		)
	}
	
})

export default CampaignView

// <LandingPage charityName={props.charityName} reason={props.reason} />
// <ContributionPage charityName={props.charityName} reason={props.reason} />
// <EmailPage charityName={props.charityName} />
// <PaymentPage charityName={props.charityName} />
// <ConfirmationPage charityName={props.charityName} />
// <LoadingPage />
// <ThanksPage />