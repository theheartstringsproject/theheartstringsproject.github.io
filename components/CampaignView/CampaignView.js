import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { VelocityComponent } from 'velocity-react';
import WorldMap from '../WorldMap/WorldMap'
import LandingPage from '../pages/LandingPage'
import ContributionPage from '../pages/ContributionPage'
import EmailPage from '../pages/EmailPage'
import PaymentPage from '../pages/PaymentPage'
import ConfirmationPage from '../pages/ConfirmationPage'
import LoadingPage from '../pages/LoadingPage'
import ThanksPage from '../pages/ThanksPage'
import './campaign.css'
		
const CampaignView = React.createClass ({

	getPageComponent: function() {
		let charityName = this.props.contribution.charityName
		let reason = this.props.contribution.reason
		let amount = this.props.contribution.amount

		switch( this.props.pageName ) {
			case 'LandingPage':
				return <LandingPage charityName={charityName} reason={reason} key={this.props.pageName}/>
			case 'ContributionPage':
				return <ContributionPage charityName={charityName} reason={reason} key={this.props.pageName}/>
			case 'EmailPage':
				return <EmailPage charityName={charityName} amount={amount} key={this.props.pageName}/>
			case 'PaymentPage':
				return <PaymentPage charityName={charityName} amount={amount} key={this.props.pageName}/>
			case 'ConfirmationPage':
				return <ConfirmationPage charityName={charityName} amount={amount} key={this.props.pageName}/>
			case 'LoadingPage':
				return <LoadingPage key={this.props.pageName}/>
			case 'ThanksPage':
				return <ThanksPage key={this.props.pageName}/>
			default: /* TODO Update to return error page */
				return <LandingPage charityName={charityName} reason={reason} key={this.props.pageName}/>
		}
	},

	getMap: function() {
		let page = this.props.pageName

		if ( page !== 'LandingPage' &&
			 page !== 'LoadingPage' )
			return

		return (
			<ReactCSSTransitionGroup transitionName='world-map' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
				<WorldMap position={ page == 'LandingPage' ? 'top' : 'center' } key='world-map'/>
			</ReactCSSTransitionGroup>
		)
	},

	render: function() {		
		return (
			<div className='Campaign'>
				{this.getMap()}
				<ReactCSSTransitionGroup transitionName={`${this.props.direction}-page`} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					{this.getPageComponent()}
				</ReactCSSTransitionGroup>
			</div>
		)
	}
	
})

export default CampaignView