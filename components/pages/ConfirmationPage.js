import React from 'react'
import InlineSVG from 'svg-inline-react'
import Link from '../Link'
import Button from '../Button/Button'
import BackButton from '../../containers/BackButton'
import ConfirmContributionButton from '../../containers/ConfirmContributionButton'
import './confirmation-page.css'

const ConfirmationPage = React.createClass({
	render: function() {
		return (
			<div className='Page confirmation-page' style={this.props.style}>
				<div className='donation-info'>
					<span className='header'>From</span>
					<span className='email'>{this.props.payment.email.value}</span>
					<span className='card-number'>{this.props.payment.cardNumber.formattedValue}</span>
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