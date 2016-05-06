import React, { PropTypes } from 'react'
import FieldKit from 'field-kit';
import ReactDOM from 'react-dom'
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

	getField: function() {
		return this.field
	},

	render: function() {
		return(
			<input
				value={this.format( this.props.securityCode.value )}
				style={this.props.style}
				placeholder="CVV"
				className="SecurityCode"
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