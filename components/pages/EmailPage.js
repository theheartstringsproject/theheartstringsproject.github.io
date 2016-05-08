import React from 'react'
import InlineSVG from 'svg-inline-react'
import Link from '../Link'
import Button from '../Button/Button'
import BackButton from '../../containers/BackButton'
import SetEmailButton from '../../containers/SetEmailButton'
import EmailInput from '../Input/EmailInput'
import PaymentEmailInput from '../../containers/PaymentEmailInput'
import * as cardStates from '../../constants/CreditCardInputStates'
import './email-page.css'

const EmailPage = React.createClass({

	isPageValid: function() {

		// Enable the next button unless the field is invalid or blank
		return this.props.email.status !== cardStates.INVALID && this.props.email.value !== ''
	},

	render: function() {
		return (
			<div className='Page email-page' style={this.props.style}>
				<PaymentEmailInput placeholder="Email" icon="envelope" email={this.props.email} />
				<small>We’ll email a receipt so you can take advantage of tax deducations for charitable contributions.</small>
				<SetEmailButton text='Next' type='secondary next-page-button' icon='forward' iconPosition='right' disabled={!this.isPageValid()}/>
			</div>
		)
	}
})

export default EmailPage