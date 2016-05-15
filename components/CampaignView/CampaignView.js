import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { VelocityComponent } from 'velocity-react';
import { presets, spring, Motion, TransitionMotion } from 'react-motion'
import WorldMap from '../WorldMap/WorldMap'
// import WorldMapCanvas from '../WorldMap/WorldMapCanvas'
import Header from '../Header/Header'
import PaymentFlow from '../PaymentFlow/PaymentFlow'
import LandingPage from '../pages/LandingPage'
import ContributionPage from '../pages/ContributionPage'
import EmailPage from '../pages/EmailPage'
import PaymentPage from '../pages/PaymentPage'
import ConfirmationPage from '../pages/ConfirmationPage'
import LoadingPage from '../pages/LoadingPage'
import ThanksPage from '../pages/ThanksPage'
import ErrorPage from '../pages/ErrorPage'
import './campaign.css'
		
const CampaignView = React.createClass ({

	getPageComponentForKey: function( key ) {
		let charityName = this.props.charity.formattedName
		let reason = this.props.charity.reason
		let amount = this.props.contribution.amount
		let email = this.props.payment.email
		let cardNumber = this.props.payment.cardNumber
		let cardCursorPosition = this.props.payment.cardCursorPosition

		switch( key ) {
			case 'LandingPage':
				return <LandingPage charity={this.props.charity} key={key}/>
			case 'PaymentFlow':
				return <PaymentFlow direction={this.props.direction} charity={this.props.charity} contribution={this.props.contribution} payment={this.props.payment} key={key} pageName={this.props.pageName} previousPageName={this.props.previousPageName}/>
			case 'ThanksPage':
				return <ThanksPage charity={this.props.charity} contribution={this.props.contribution} payment={this.props.payment} pageName={this.props.pageName} key={key} />
			case 'ErrorPage':
				return <ErrorPage pageName={this.props.pageName} key={key}/>
			default: /* TODO Update to return error page */
				return <LandingPage charity={this.props.charity} key={key}/>
		}

		// switch( key ) {
		// 	case 'LandingPage':
		// 		return <LandingPage charityName={charityName} reason={reason} key={key}/>
		// 	case 'ContributionPage':
		// 		return <ContributionPage charityName={charityName} reason={reason} key={key}/>
		// 	case 'EmailPage':
		// 		return <EmailPage charityName={charityName} amount={amount} email={email} key={key}/>
		// 	case 'PaymentPage':
		// 		return <PaymentPage charityName={charityName} amount={amount} cardNumber={cardNumber} key={key}/>
		// 	case 'ConfirmationPage':
		// 		return <ConfirmationPage charityName={charityName} amount={amount} email={email} cardNumber={cardNumber} cardCursorPosition={cardCursorPosition} key={key}/>
		// 	case 'LoadingPage':
		// 		return <LoadingPage key={key}/>
		// 	case 'ThanksPage':
		// 		return <ThanksPage key={key}/>
		// 	default: /* TODO Update to return error page */
		// 		return <LandingPage charityName={charityName} reason={reason} key={key}/>
		// }
	},

	getKeyForPage: function( pageName ) {
		if ( 	pageName === 'LandingPage' ||
				pageName === 'ThanksPage' ||
				pageName === 'ErrorPage'
			)
		{
			return pageName
		} else {
			return 'PaymentFlow'
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

	pageWillEnter: function() {
		// const newPage = ReactDOM.findDOMNode(this.currentPage)
		// newPage.style.height = newPage.clientHeight
		// newPage.className += " page-enter"

		// Start the page offscreen, measured by the width of the window
		const startingPosition = window.innerWidth

		return {
			x: this.props.direction === 'next' ? startingPosition : -startingPosition
		}
	},

	pageWillLeave: function( styles ) {
		// ReactDOM.findDOMNode(this.previousPage).className += " page-leave";
		const oldPage = ReactDOM.findDOMNode(this.previousPage)
		// oldPage.style.height = oldPage.clientHeight
		if ( !oldPage.className.includes("page-leave") ) {
			oldPage.className += " page-leave"
		}

		// Move the page offscreen, measured by the width of the window
		const endingPosition = window.innerWidth
		
		// oldPage.style.height = oldPage.clientHeight
		return {
			x: this.props.direction === 'next' ? spring(-endingPosition, {stiffness: 160, damping: 20}) : spring(endingPosition, {stiffness: 160, damping: 20})
		}
	},

	render: function() {
		const key = this.getKeyForPage( this.props.pageName )	

		// Begin pages offscreen, measured by the width of the window
		const startingPosition = window.innerWidth

		return (
			<div className='Campaign'>
				{this.getMap()}
				{/*<ReactCSSTransitionGroup transitionName={`${this.props.direction}-page`} transitionEnterTimeout={500} transitionLeaveTimeout={500}>*/}
				<TransitionMotion
					willEnter={this.pageWillEnter}
					willLeave={this.pageWillLeave}
					defaultStyles={[{
						key: key,
						style: {
							x: this.props.direction === 'next' ? startingPosition : -startingPosition
						}
					}]}
					styles={[{
						key: key,
						style: {
							x: spring(0, {stiffness: 160, damping: 20})							
						}
					}]}>
					{interpolatedStyles =>
						<div className='pages'>
						{interpolatedStyles.map(config => {
							const style = {
								WebkitTransform: `translate3d(${config.style.x}%, 0, 0)`,
								transform: `translate3d(${config.style.x}%, 0, 0)`
							}
							let element = React.cloneElement( this.getPageComponentForKey(config.key), {
								style: style,
								ref: ( ref ) => {
									if ( config.key === key ) {
										this.currentPage = ref
									} else {
										this.previousPage = ref
									}
								}

							})
							return element
						})}
						</div>
					}
				</TransitionMotion>
				{/*</ReactCSSTransitionGroup>*/}
			</div>
		)
	}
	
})

export default CampaignView