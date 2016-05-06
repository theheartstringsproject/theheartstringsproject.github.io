import React, { PropTypes } from 'react'
import FieldKit from 'field-kit';
import ReactDOM from 'react-dom'
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

	render: function() {
		return(
			<input
				style={this.props.style}
				placeholder="Card Number"
				className="CardNumber"
				onChange={e => {
					e.preventDefault()
					this.props.onChange(
						this.unformat( e.target.value.trim() ),
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

export default CreditCardNumberInput