import React from 'react'
import Link from '../Link'
import InfoButton from '../../containers/InfoButton'
import BackButton from '../../containers/BackButton'
import BackFromInfoButton from '../../containers/BackFromInfoButton'
import InlineSVG from 'svg-inline-react'
// import DonationIcon from './DonationIcon'
import { presets, spring, Motion, TransitionMotion } from 'react-motion'
import './header.css'

const pagesWithBack = [
	'ContributionPage',
	'EmailPage',
	'PaymentPage',
	'ConfirmationPage',
	'InfoPage'
]

const pagesWithInfo = [
	'ContributionPage',
	'EmailPage',
	'PaymentPage',
	'ConfirmationPage'
]

const CAMPAIGN_HEIGHT = 400 - 48;

const Header = React.createClass({	

	getText: function() {
		let name = this.props.charity.formattedName
		let url = this.props.charity.charityURL || this.props.charity.orgHunterURL

		switch( this.props.pageName ) {
			case 'LandingPage':
				return
			case 'ContributionPage':
				return <p>How much would you like to donate to <Link text={name} href={url}/>?</p>
			case 'EmailPage':
				return <p>${this.props.amount} to <Link text={name} href={url} /></p>
			case 'PaymentPage':
				return <p>${this.props.amount} to <Link text={name} href={url} /></p>
			case 'ConfirmationPage':
				return <p>${this.props.amount} to <Link text={name} href={url} /></p>
			case 'LoadingPage':
				return <p>Processing your donation...</p>
			case 'ThanksPage':
				return <p>Thanks! Share this article to help others make a difference</p>
			case 'InfoPage':
				return <p><Link text={name} href={url}/></p>
			case 'ErrorPage':
				return <p>Unfortuntely we’re having trouble processing your donation.</p>
			default:
				return
		}
	},

	getBackButton: function() {
		if ( this.props.pageName === 'InfoPage' ) {
			return <BackFromInfoButton type='tertiary circle' icon='back' />
		} else if ( pagesWithBack.includes( this.props.pageName ) ) {
			return <BackButton type='tertiary circle' icon='back' />
		}
	},

	getInfoButton: function() {
		if ( pagesWithInfo.includes( this.props.pageName ) ) {
			return <InfoButton type='tertiary circle' icon='info' />
		}
	},

	getDonationIcons: function() {
		switch( this.props.pageName ) {
			case 'LandingPage':
				return []
			case 'ContributionPage':
				return ['donation-icon']
			case 'EmailPage':
				return [this.getDonationIcon(), this.getAmountIcon()]
			case 'PaymentPage':
				return [this.getDonationIcon(), this.getAmountIcon()]
			case 'ConfirmationPage':
				return [this.getDonationIcon(), this.getAmountIcon()]
			case 'LoadingPage':
				return [this.getDonationIcon(), this.getAmountIcon()]
			case 'ThanksPage':
				return [this.getThanksIcon()]
			case 'InfoPage':
				return [this.getDonationIcon()]
			case 'ErrorPage':
				return [this.getErrorIcon()]
			default:
				return []
		}
	},

	getDonationIconKeys: function() {
		switch( this.props.pageName ) {
			case 'LandingPage':
				return []
			case 'ContributionPage':
				return ['donation-icon']
			case 'EmailPage':
				return ['donation-icon', 'donation-amount-icon']
			case 'PaymentPage':
				return ['donation-icon', 'donation-amount-icon']
			case 'ConfirmationPage':
				return ['donation-icon', 'donation-amount-icon']
			case 'LoadingPage':
				return ['donation-icon', 'donation-amount-icon']
			case 'ThanksPage':
				return ['thanks-icon']
			case 'InfoPage':
				return ['donation-icon']
			case 'ErrorPage':
				return ['error-icon']
			default:
				return []
		}
	},

	getDonationIconForKey: function( key ) {
		switch( key ) {
			case 'donation-icon':
				return this.getDonationIcon()
			case 'donation-amount-icon':
				return this.getAmountIcon()
			case 'thanks-icon':
				return this.getThanksIcon()
			case 'error-icon':
				return this.getErrorIcon()
			default:
				return ''
		}
	},

	amountIconWillEnter: function( startingStyle ) {
		return {scale: 0.8, opacity: 0, x: 0}
	},

	amountIconWillExit: function() {
		return {scale: spring(0.8, {stiffness: 160, damping: 20}), opacity: spring(0), x: spring(0, {stiffness: 160, damping: 20})}
	},

	getAmountIcon: function() {
		let amount = this.props.amount ? this.props.amount : 0
		return (
			<div className='donation-amount-icon' key='donation-amount-icon'>
				<InlineSVG src={require(`svg-inline!../../icons/donate-amount-circle.svg`)} />
				<span className='donation-amount'>${amount}</span>
			</div>
		)
	},

	getDonationIcon: function() {
		return (
			<div className='charity-icon' key='charity-icon'>
				<InlineSVG src={require(`svg-inline!../../icons/heart-hands-circle.svg`)} />
			</div>
		)
	},

	getThanksIcon: function() {
		return (
			<div className='thanks-icon' key='thanks-icon'>
				<InlineSVG src={require(`svg-inline!../../icons/check-circle-large.svg`)} />
			</div>
		)
	},

	getErrorIcon: function() {
		return (
			<div className='error-icon' key='error-icon'>
				<InlineSVG src={require(`svg-inline!../../icons/broken.svg`)} />
			</div>
		)
	},

	getXForIcon: function( icon ) {

		// This only applies to the charity icon's position
		if ( icon !== 'donation-icon') {
			return 0 
		}

		// If we're heading to the email page from the contribution page,
		// move the charity icon over to make room for the amount icon.
		// If we're moving in the opposite direction, do the reverse.
		if ( ['EmailPage', 'PaymentPage', 'ConfirmationPage', 'LoadingPage'].includes( this.props.pageName ) ) {
			return -30
		} else {
			return 0
		}
		// if ( this.props.pageName === 'EmailPage' && this.props.previousPageName === 'ContributionPage' ) {
		// 	return -30
		// } else if ( this.props.pageName === 'ContributionPage' &&  this.props.previousPageName === 'EmailPage' ) {
		// 	return 30
		// } else {
		// 	return 0
		// }
	},

	willEnter: function() {
		return {opacity: spring(1)}
	},

	willLeave: function() {
		return {opacity: spring(0)}
	},

	render: function() {	
		let headerHeight = this.header ? this.header.offsetHeight : 0	
		let style = {
			opacity: this.props.pageName === 'LandingPage' ? spring(0) : spring(1),
			y: this.props.pageName === 'LoadingPage' ? spring( ( CAMPAIGN_HEIGHT - headerHeight ) / 2, {stiffness: 160, damping: 20}) : spring(0, {stiffness: 160, damping: 20})
		}

		let donationIcons = this.getDonationIconKeys()

		return (
      		<Motion style={style}>
      			{interpolatedStyle => {
      					return (
      						<div className="Header"
      							 key='header'
      							 style={{
      							 	WebkitTransform: `translateY(${interpolatedStyle.y}%)`,
                  					transform: `translateY(${interpolatedStyle.y}%)`,
                  					opacity: interpolatedStyle.opacity
                  				}}
                  				ref={(ref) => this.header = ref}>
								<nav>
									{this.getBackButton()}
									<TransitionMotion
										willEnter={this.amountIconWillEnter}
										willLeave={this.amountIconWillExit}
										defaultStyles={donationIcons.map( key => {
											return {
												key: key,
												style: {scale: .8, opacity: 0, x: this.getXForIcon( key )}
											}
										})}
										styles={donationIcons.map( key => {
											return {
												key: key,
												style: {scale: spring(1, {stiffness: 160, damping: 20}), opacity: spring(1), x: spring( this.getXForIcon( key ), {stiffness: 160, damping: 20} )}
											}
										})}>
										{interpolatedStyles =>
											<div className='donation-icons'>
											{	
												interpolatedStyles.map( ({key, style}) => {
													return React.cloneElement( this.getDonationIconForKey( key ), {
														style: {
															WebkitTransform: `translate3d(${style.x}px, 0px, 0) scale(${style.scale})`,
															transform: `translate3d(${style.x}px, 0px, 0) scale(${style.scale})`,
															opacity: style.opacity
														},
														key: key
													})
												})
											}
											</div>
										}
									</TransitionMotion>
									{this.getInfoButton()}
								</nav>
								{this.getText()}
							</div>
						)
      			}}
      		</Motion>
		)
	}
})

export default Header