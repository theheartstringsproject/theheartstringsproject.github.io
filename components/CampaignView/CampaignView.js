import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { VelocityComponent } from 'velocity-react';
import { presets, spring, Motion, TransitionMotion } from 'react-motion'
import WorldMap from '../WorldMap/WorldMap'
import Header from '../Header/Header'
import PaymentFlow from '../PaymentFlow/PaymentFlow'
import LandingPage from '../pages/LandingPage'
import ContributionPage from '../pages/ContributionPage'
import EmailPage from '../pages/EmailPage'
import PaymentPage from '../pages/PaymentPage'
import ConfirmationPage from '../pages/ConfirmationPage'
import LoadingPage from '../pages/LoadingPage'
import ThanksPage from '../pages/ThanksPage'
import './campaign.css'
		
const CampaignView = React.createClass ({

	getPageComponentForKey: function( key ) {
		let charityName = this.props.contribution.charityName
		let reason = this.props.contribution.reason
		let amount = this.props.contribution.amount
		let email = this.props.payment.email
		let cardNumber = this.props.payment.cardNumber
		let cardCursorPosition = this.props.payment.cardCursorPosition

		switch( key ) {
			case 'LandingPage':
				return <LandingPage charityName={charityName} reason={reason} key={key}/>
			case 'PaymentFlow':
				return <PaymentFlow direction={this.props.direction} contribution={this.props.contribution} payment={this.props.payment} key={key} pageName={this.props.pageName} previousPageName={this.props.previousPageName}/>
			case 'ThanksPage':
				return <ThanksPage contribution={this.props.contribution} payment={this.props.payment} key={key} pageName={this.props.pageName} key={key} />
			default: /* TODO Update to return error page */
				return <LandingPage charityName={charityName} reason={reason} key={key}/>
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
		if ( pageName === 'LandingPage' || pageName === 'ThanksPage' ) {
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
		return {
			x: this.props.direction === 'next' ? 100 : -100
		}
	},

	pageWillLeave: function( styles ) {
		// ReactDOM.findDOMNode(this.previousPage).className += " page-leave";
		const oldPage = ReactDOM.findDOMNode(this.previousPage)
		// oldPage.style.height = oldPage.clientHeight
		if ( !oldPage.className.includes("page-leave") ) {
			oldPage.className += " page-leave"
		}
		
		// oldPage.style.height = oldPage.clientHeight
		return {
			x: this.props.direction === 'next' ? spring(-100, presets.stiff) : spring(100, presets.stiff)
		}
	},

	render: function() {
		const key = this.getKeyForPage( this.props.pageName )		
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
							x: this.props.direction === 'next' ? 100 : -100
						}
					}]}
					styles={[{
						key: key,
						style: {
							x: spring(0, presets.stiff)							
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