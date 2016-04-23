import React from 'react'
import InlineSVG from 'svg-inline-react'
import Link from '../Link'
import Button from '../Button/Button'
import BackButton from '../../containers/BackButton'
import NextButton from '../../containers/NextButton'
import Input from '../Input/Input'
import PaymentInput from '../../containers/PaymentInput'
import Checkbox from '../Checkbox/Checkbox'
import './payment-page.css'

const PaymentPage = React.createClass({
	render: function() {
		return (
			<div className='Page payment-page' style={this.props.style}>
				<PaymentInput placeholder="Card Number" icon="credit-card" value={this.props.cardNumber}/>
				<Checkbox name='remember-card' label='Remember my payment info on this device for future donations.' /*checked={this.props.savePaymentInfo}*/ />
				<NextButton text='Next' type='secondary next-page-button' icon='forward' iconPosition='right'/>
			</div>
		)
	}
})

export default PaymentPage