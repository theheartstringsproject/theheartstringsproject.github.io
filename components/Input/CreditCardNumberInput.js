import React, { PropTypes } from 'react'
import FieldKit from 'field-kit';
import ReactDOM from 'react-dom'
import * as cardStates from '../../constants/CreditCardInputStates'
import './input.css'
import './credit-card-payment-input.css'

const CreditCardNumberInput = React.createClass({

	componentDidMount: function() {

		// Set up fieldkit formatting
		this.field = new FieldKit.CardTextField( ReactDOM.findDOMNode( this ) );
		this.field.setValue(this.props.cardNumber.value);
		this.field.setCardMaskStrategy(
			FieldKit.CardTextField.CardMaskStrategy.DoneEditing
		);
		this.field.setDelegate({
			textDidChange: this.onChange
		})
	},

	format: function( cardNumber = '' ) {

		let newString = cardNumber

		if ( newString.length <= 4 )
			return newString

		if ( newString.length > 4 ) {
			newString = [newString.slice(0, 4), ' ', newString.slice(4)].join('')
		}

		if ( newString.length > 11 ) {
			newString = [newString.slice(0, 11), ' ', newString.slice(11)].join('')
		}

		return newString
	},

	unformat: function( cardNumber = '' ) {

		let newString = cardNumber

		// Remove any non-numerical characters
		newString = newString.replace(/\D/g,'')

		return newString
	},

	getState: function() {

		let number = this.field ? this.field.value() : ''

		// Check whether the number is blank
		if ( number === '' )
			return cardStates.BLANK

		// Check whether the number is the right character count
		if ( number.length < 15 )
			return cardStates.INCOMPLETE

		if ( this.field.cardType() !== 'amex' && number.length < 16 )
			return cardStates.INCOMPLETE

		// Check whether the number is valid
		if ( Stripe.card.validateCardNumber( number ) )
			return cardStates.VALID

		// Otherwise return invalid
		return cardStates.INVALID

	},

	isDoneEditing: function() {
		let done = false

		if ( this.field) {
			done =  this.field.cardType() === 'amex' ?
					this.field.value().length === 15 :
					this.field.value().length === 16
		}

		return done
	},

	getField: function() {
		return this.field
	},

	onChange: function( field ) {
		console.log( ReactDOM.findDOMNode( this ).selectionStart )
		this.props.onChange(
			this.field.value(),
			this.field.cardMask(),
			this.getState(),
			ReactDOM.findDOMNode( this ).selectionStart
		)

		if ( this.isDoneEditing() && this.getState() === cardStates.VALID ) {
			this.props.onShouldMoveToExpirationDateField()
			// this.props.onDidFinishEditing()
		}
	},

	render: function() {
		let errorClass = this.props.cardNumber.status === cardStates.INVALID ? 'Error' : ''
		return(
			<input
				style={this.props.style}
				placeholder="Card Number"
				className={`CardNumber ${errorClass}`}
				// onChange={e => {
				// 	e.preventDefault()
				// 	this.props.onChange(
				// 		this.field.value(),
				// 		this.getState(),
				// 		e.target.selectionStart
				// 	)

				// 	if ( this.isDoneEditing() && this.getState() === cardStates.VALID ) {
				// 		this.props.onDidFinishEditing()
				// 	}
				// }}
				onFocus={e => {
					this.props.onFocus()
				}}
			/>)
	}

})

export default CreditCardNumberInput