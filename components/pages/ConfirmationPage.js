import React from 'react'
import InlineSVG from 'svg-inline-react'
import Link from '../Link'
import Button from '../Button/Button'
import BackButton from '../../containers/BackButton'
import ConfirmContributionButton from '../../containers/ConfirmContributionButton'
import './confirmation-page.css'

const ConfirmationPage = (props) => (
	<div className='Page confirmation-page'>
		<div className="Header">
			<nav>
				<BackButton type='tertiary circle' icon='back' />
				<div className='donation-icons'>
					<div className='charity-icon'>
						<InlineSVG src={require(`svg-inline!../../icons/heart-hands-circle.svg`)} />
					</div>
					<div className='donation-amount-icon'>
						<InlineSVG src={require(`svg-inline!../../icons/donate-amount-circle.svg`)} />
						<span className='donation-amount'>${props.amount}</span>
					</div>
				</div>
				<Button type='tertiary circle' icon='info' />
			</nav>
			<p>${props.amount} to the <Link text={props.charityName} /></p>
		</div>
		<div className='donation-info'>
			<span className='header'>From</span>
			<span className='email'>lubin.jeremy@gmail.com</span>
			<span className='card-number'>•••• •••••• •4507</span>
		</div>
		<ConfirmContributionButton text={`Confirm $${props.amount} Donation`} type='primary' />
		<div className='Footer'>
			<Button text='Forget my payment info' type='quaternary small' />
		</div>
	</div>
)

export default ConfirmationPage