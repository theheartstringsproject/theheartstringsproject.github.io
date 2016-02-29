import React from 'react'
import InlineSVG from 'svg-inline-react'
import Link from '../Link'
import Button from '../Button/Button'
import BackButton from '../../containers/BackButton'
import NextButton from '../../containers/NextButton'
import Input from '../Input/Input'
import Checkbox from '../Checkbox/Checkbox'
import './payment-page.css'

const PaymentPage = (props) => (
	<div className='Page payment-page'>
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
		<Input placeholder="Card Number" icon="credit-card" />
		<Checkbox name='remember-card' label='Remember my payment info on this device for future donations.' /*checked={props.savePaymentInfo}*/ />
		<NextButton text='Next' type='secondary next-page-button' icon='forward' iconPosition='right'/>
	</div>
)

export default PaymentPage