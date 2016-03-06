import React from 'react'
import InlineSVG from 'svg-inline-react'
import Link from '../Link'
import Button from '../Button/Button'
import BackButton from '../../containers/BackButton'
import ConfirmContributionButton from '../../containers/ConfirmContributionButton'
import './confirmation-page.css'

const formatCardNumber = ( cardNumber ) => {
	let newString = '',
		i = 0

	if ( cardNumber.length <= 4 )
		return cardNumber

	for ( ; i < cardNumber.length - 4 ; i++ ) {
		newString += '•'
	}

	newString += cardNumber.slice(-4)

	if ( newString.length > 4 ) {
		newString = [newString.slice(0, 4), ' ', newString.slice(4)].join('')
	}

	if ( newString.length > 11 ) {
		newString = [newString.slice(0, 11), ' ', newString.slice(11)].join('')
	}

	return newString
}

const ConfirmationPage = React.createClass({
	render: function() {
		return (
			<div className='Page confirmation-page' style={this.props.style}>
				<div className='donation-info'>
					<span className='header'>From</span>
					<span className='email'>{this.props.email}</span>
					<span className='card-number'>{formatCardNumber(this.props.cardNumber)}</span>
				</div>
				<ConfirmContributionButton text={`Confirm $${this.props.amount} Donation`} type='primary' />
				<div className='Footer'>
					<Button text='Forget my payment info' type='quaternary small' />
				</div>
			</div>
		)
	}
})

export default ConfirmationPage