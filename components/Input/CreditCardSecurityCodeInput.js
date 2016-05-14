import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import * as inputStates from '../../constants/InputStates'
import './input.css'
import './credit-card-payment-input.css'

const CreditCardSecurityCodeInput = React.createClass({

	format: function( code = '' ) {

		return code

	},

	unformat: function( code = '' ) {

		let newString = code

		// Remove any non-numercal characters
		newString = newString.replace(/\D/g, '')

		// Return a maximum of 4 characters
		if ( newString.length > 4 ) {
			newString = newString.slice( 0, 4 )
		}

		return newString
	},

	isDoneEditing: function() {
		let done = false

		// if ( this.field) {
		// 	done =  this.field.cardType() === 'amex' ?
		// 			this.field.value().length === 15 :
		// 			this.field.value().length === 16
		// }

		return done
	},

	getState: function( value = '' ) {

		// Check whether the number is blank
		if ( value === '' )
			return inputStates.BLANK

		// Check that we have enough characters
		if ( value.length < 3 )
			return inputStates.INCOMPLETE

		// Check whether the date is valid
		if ( Stripe.card.validateCVC( value ) )
			return inputStates.VALID

		// Otherwise return invalid
		return inputStates.INVALID
	},

	getField: function() {
		return this.field
	},

	isInError: function() {
		return 	this.props.securityCode.status === inputStates.INVALID ||
				this.props.securityCode.status === inputStates.INCORRECT
	},

	render: function() {
		let errorClass = this.isInError() ? 'Error' : ''
		return(
			<input
				inputMode='numeric'
				pattern="[0-9]*"
				value={this.format( this.props.securityCode.value )}
				style={this.props.style}
				placeholder="CVV"
				className={`SecurityCode ${errorClass}`}
				onChange={e => {
					e.preventDefault()
					this.props.onChange(
						this.unformat( e.target.value.trim(), e.target.selectionStart ),
						e.target.selectionStart
					)

					if ( this.isDoneEditing() ) {
						// TODO check whether card is valid
						// this.props.onDidFinishEditing()
					}
				}}
				onFocus={e => {
					this.props.onFocus()
				}}
			/>)
	}

})

export default CreditCardSecurityCodeInput