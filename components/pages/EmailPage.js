import React from 'react'
import InlineSVG from 'svg-inline-react'
import Link from '../Link'
import Button from '../Button/Button'
import BackButton from '../../containers/BackButton'
import NextButton from '../../containers/NextButton'
import Input from '../Input/Input'
import EmailInput from '../../containers/EmailInput'
import './email-page.css'

const EmailPage = React.createClass({
	render: function() {
		return (
			<div className='Page email-page' style={this.props.style}>
				<EmailInput placeholder="Email" icon="envelope" value={this.props.email} />
				<small>We’ll email a receipt so you can take advantage of tax deducations for charitable contributions.</small>
				<NextButton text='Next' type='secondary next-page-button' icon='forward' iconPosition='right'/>
			</div>
		)
	}
})

export default EmailPage