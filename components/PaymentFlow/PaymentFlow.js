import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { VelocityComponent } from 'velocity-react';
import { presets, spring, Motion, TransitionMotion } from 'react-motion'
import WorldMap from '../WorldMap/WorldMap'
import Header from '../Header/Header'
import LandingPage from '../pages/LandingPage'
import ContributionPage from '../pages/ContributionPage'
import EmailPage from '../pages/EmailPage'
import PaymentPage from '../pages/PaymentPage'
import ConfirmationPage from '../pages/ConfirmationPage'
import LoadingPage from '../pages/LoadingPage'
import ThanksPage from '../pages/ThanksPage'
import './payment-flow.css'
		
const PaymentFlow = React.createClass ({

	getKeyForPageName: function( pageName ) {
		if ( pageName === 'ContributionPage' ||
			 pageName === 'EmailPage' ||
			 pageName === 'PaymentPage' ||
			 pageName === 'ConfirmationPage' ||
			 pageName === 'LoadingPage'
			) {
			return pageName
		} else {
			return 'LoadingPage'
		}
	},

	getPageComponentForKey: function( key ) {
		let charityName = this.props.contribution.charityName
		let reason = this.props.contribution.reason
		let amount = this.props.contribution.amount
		let email = this.props.payment.email
		let cardNumber = this.props.payment.cardNumber
		let cardCursorPosition = this.props.payment.cardCursorPosition

		switch( key ) {
			case 'ContributionPage':
				return <ContributionPage charityName={charityName} reason={reason} key={key}/>
			case 'EmailPage':
				return <EmailPage charityName={charityName} amount={amount} email={email} key={key}/>
			case 'PaymentPage':
				return <PaymentPage charityName={charityName} amount={amount} cardNumber={cardNumber} key={key}/>
			case 'ConfirmationPage':
				return <ConfirmationPage charityName={charityName} amount={amount} email={email} cardNumber={cardNumber} cardCursorPosition={cardCursorPosition} key={key}/>
			case 'LoadingPage':
				return <LoadingPage key={key}/>
			default: /* TODO Update to return error page */
				return <LoadingPage key={key}/>
		}
	},

	pageWillEnter: function() {
		// const newPage = ReactDOM.findDOMNode(this.currentPage)
		// newPage.style.height = newPage.clientHeight
		// newPage.className += " page-enter"

		// Begin pages offscreen, measured by the width of the window
		const startingPosition = window.innerWidth

		// Don't do any animation if we're transitioning out of the payment flow,
		if ( this.props.pageName === 'LandingPage' || this.props.pageName === 'ThanksPage' ) {
			return { x: 0 }
		}

		return {
			x: this.props.direction === 'next' ? startingPosition : -startingPosition
		}
	},

	pageWillLeave: function() {
		// ReactDOM.findDOMNode(this.previousPage).className += " page-leave";

		// Don't do any animation if we're transitioning out of the payment flow,
		if ( this.props.pageName === 'LandingPage' || this.props.pageName === 'ThanksPage' ) {
			return { x: 0 }
		}

		const oldPage = ReactDOM.findDOMNode(this.previousPage)
		// oldPage.style.height = oldPage.clientHeight
		oldPage.className += " page-leave"
		oldPage.style.height = oldPage.clientHeight + 'px'

		// Transition pages offscreen, measured by the width of the window
		const endingPosition = window.innerWidth

		return {
			x: this.props.direction === 'next' ? spring(-endingPosition, {stiffness: 160, damping: 20}) : spring(endingPosition, {stiffness: 160, damping: 20})
		}
	},

	render: function() {	
		const key = this.getKeyForPageName( this.props.pageName )

		// Begin pages offscreen, measured by the width of the window
		const startingPosition = window.innerWidth
		
		return (
			<div className='Page PaymentFlow' style={this.props.style}>
				<Header charityName={this.props.contribution.charityName} reason={this.props.contribution.reason} amount={this.props.contribution.amount} pageName={key} previousPageName={this.props.previousPageName} key='header'/>
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
							let element = React.cloneElement( this.getPageComponentForKey(config.key), {
								style: {
									WebkitTransform: `translateX(${config.style.x}%)`,
									transform: `translateX(${config.style.x}%)`
								},
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

export default PaymentFlow