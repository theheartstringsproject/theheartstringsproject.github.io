import React, { PropTypes } from 'react'
import FieldKit from 'field-kit/src/index.js';
import ReactDOM from 'react-dom'
import * as inputStates from '../../constants/InputStates'
import * as paymentFormStates from '../../constants/PaymentFormStates'
import './input.css'
import './credit-card-payment-input.css'

const CreditCardNumberInput = React.createClass({

	componentDidMount: function() {

		// Set up fieldkit formatting
		this.field = new FieldKit.CardTextField( ReactDOM.findDOMNode( this ) );
		this.field.setValue(this.props.cardNumber.value);
		// this.field.setCardMaskStrategy(
		// 	FieldKit.CardTextField.CardMaskStrategy.DoneEditing
		// );
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
			return inputStates.BLANK

		// Check whether the number is the right character count
		if ( number.length < 15 )
			return inputStates.INCOMPLETE

		if ( this.field.cardType() !== 'amex' && number.length < 16 )
			return inputStates.INCOMPLETE

		// Check whether the number is valid
		if ( Stripe.card.validateCardNumber( number ) )
			return inputStates.VALID

		// Otherwise return invalid
		return inputStates.INVALID

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
		this.props.onChange(
			this.field.value(),
			this.field.cardType(),
			this.field.cardMask(),
			this.getState(),
			ReactDOM.findDOMNode( this ).selectionStart,

			// Also pass the widths of ghost elements on the payment page
			// so that we can save them to state and render them appropriately
			// the next time this page does a fresh render. Upon fresh render,
			// these elements won't be present in the DOM yet to measure directly.
			{
				cardNumberGhostWidth: document.getElementsByClassName( paymentFormStates.CARD_NUMBER_GHOST_CLASS )[0].scrollWidth,
				abbreviatedCardNumberGhostWidth: document.getElementsByClassName( paymentFormStates.ABBREVIATED_CARD_NUMBER_GHOST_CLASS )[0].scrollWidth,
				fieldsWidth: document.getElementsByClassName( paymentFormStates.FIELDS_CLASS )[0].scrollWidth
			}
		)

		if ( this.isDoneEditing() && this.getState() === inputStates.VALID ) {
			this.props.onShouldMoveToExpirationDateField()
			// this.props.onDidFinishEditing()
		}
	},

	isInError: function() {
		return  this.props.cardNumber.status === inputStates.INVALID ||
			 	this.props.cardNumber.status === inputStates.EXPIRED ||
			 	this.props.cardNumber.status === inputStates.INCORRECT ||
			 	this.props.cardNumber.status === inputStates.DECLINED
	},

	render: function() {
		let errorClass = this.isInError() ? 'Error' : ''
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

				// 	if ( this.isDoneEditing() && this.getState() === inputStates.VALID ) {
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