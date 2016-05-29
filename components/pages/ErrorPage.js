import React from 'react'
import InlineSVG from 'svg-inline-react'
import Button from '../Button/Button'
import Header from '../Header/Header'
import BackToPaymentButton from '../../containers/BackToPaymentButton'
import './error-page.css'

const ErrorPage = React.createClass({
	render: function() {
		return (
			<div className='Page error-page' style={this.props.style}>
				<Header pageName={this.props.pageName} charity={this.props.charity} key='error-header'/>
				<p className='error-message'>We recommend double-checking your payment info and trying again in a few minutes.</p>
				<BackToPaymentButton text='Check Payment Info' type='primary' icon='back' />
			</div>
		)
	}
})

export default ErrorPage