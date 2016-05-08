import React from 'react'
import InlineSVG from 'svg-inline-react'
import Link from '../Link'
import Button from '../Button/Button'
import BackButton from '../../containers/BackButton'
import NextButton from '../../containers/NextButton'
import PaymentInput from '../../containers/PaymentInput'
import Checkbox from '../Checkbox/Checkbox'
import * as cardStates from '../../constants/CreditCardInputStates'
import './payment-page.css'

const PaymentPage = React.createClass({

	isPageValid: function() {
		
		// Return true only if all three fields are VALID
		if ( this.props.payment.cardNumber.status === cardStates.VALID &&
			 this.props.payment.expirationDate.status === cardStates.VALID && 
			 this.props.payment.securityCode.status === cardStates.VALID )
		{
			return true
		}

		return false
	},

	render: function() {
		return (
			<div className='Page payment-page' style={this.props.style}>
				<PaymentInput icon="credit-card" payment={this.props.payment}/>
				<Checkbox name='remember-card' label='Remember my payment info on this device for future donations.' /*checked={this.props.savePaymentInfo}*/ />
				<NextButton text='Next' type='secondary next-page-button' icon='forward' iconPosition='right' disabled={!this.isPageValid()}/>
			</div>
		)
	}
})

export default PaymentPage