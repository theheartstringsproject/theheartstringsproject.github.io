import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import InlineSVG from 'svg-inline-react'
import './input.css'

// const DELETE_KEY_CODE = 46

// const Input = (props) => (
const Input = React.createClass({

	componentDidMount: function() {
		// debugger;
		// ReactDOM.findDOMNode(this).setSelectionRange( this.props.cardCursorPosition, this.props.cardCursorPosition );
	},

	formatCardNumber: function( cardNumber = '' ) {

		let newString = cardNumber

		// Remove any non-numerical characters
		newString = newString.replace(/\D/g,'')

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

	formatExpirationDate: function( month = '', year = '' ) {

		let newMonth = month,
			newYear = year

		// Format the Month
		// -----------------
		// 1) Make sure it's not greater than 12
		newMonth = parseInt(newMonth) > 12 ? '12' : newMonth

		// Format the Year
		// ----------------
		// 1) Remove the '20' from the beginning
		newYear = newYear.slice( 2, newYear.length )

		if ( newYear === '' ) {
			if ( newMonth.length === 2 ) {
				return newMonth + '/'
			} else {
				return newMonth
			}
		} else if ( newMonth === '' ) {
			return ''
		} else {
			return newMonth + '/' + newYear
		}
		
	},

	formatSecurityCode: function( code = '' ) {

		let newString = code

		// Remove any non-numercal characters
		newString = newString.replace(/\D/g, '')

		// Return a maximum of 4 characters
		if ( newString.length > 4 ) {
			newString = newString.slice( 0, 4 )
		}

		return newString

	},

	unformatCardNumber: function( cardNumber = '' ) {

		let newString = cardNumber

		// Remove any spaces we'd previously added
		newString = newString.replace(/ /g, '')

		return newString
	},

	unformatExpirationDate: function( date = '', cursorPosition = 0 ) {

		let newString = date

		// Remove any non-numeric characters
		// with the exception of the slash
		newString = newString.replace( /[^0-9\/]/g, '' )

		// Cap the string at 4 numbers and a slash
		let allowedLength = newString.includes('/') ? 5 : 4
		if ( newString.length > allowedLength ) {
			newString = newString.slice( 0, allowedLength )
		}


		// If the user has just deleted the slash,
		// remove both the slash and the digit just before it.
		// We know the slash was deleted if
		let previousMonthString = this.props.payment.expirationMonth ? this.props.payment.expirationMonth.toString() : ''
		let previousYearString = this.props.payment.expirationYear ? this.props.payment.expirationYear.toString().slice( 2, this.props.payment.expirationYear.toString().length ) : ''
		let dateString = previousMonthString + previousYearString
		if ( 	newString === dateString &&						// 1) the input value matches the expirationDate prop
			 	newString.length === dateString.length &&		// 2) they're both 2 digits
			 	cursorPosition === 2							// 3) the caret position is at the end of the string
			)
		{
			newString = newString.slice( 0, 1 ) + '/' + newString.slice( 2, newString.length )
		}

		// Remove the slash that we'd previously added
		// newString = newString.replace(/\//, '')
		return newString
	},

	render: function() {
		return (<div className="Input">
					<InlineSVG src={require(`svg-inline!../../icons/${this.props.icon}.svg`)} />
					<input  placeholder="Card Number"
							value={this.formatCardNumber( this.props.payment.cardNumber )}
							onChange={e => {
								e.preventDefault()
								this.props.onCardNumberChange(
									this.unformatCardNumber( e.target.value.trim() ),
									e.target.selectionStart
								)
							}}
					/>
					<input  placeholder="MM/YY"
							value={this.formatExpirationDate( this.props.payment.expirationMonth, this.props.payment.expirationYear  )}
							onChange={e => {
								e.preventDefault()
								this.props.onExpirationDateChange(
									this.unformatExpirationDate( e.target.value.trim(), e.target.selectionStart ),
									e.target.selectionStart
								)
							}}
					/>
					<input  placeholder="CVV"
							value={this.formatSecurityCode( this.props.payment.securityCode )}
							onChange={e => {
								e.preventDefault()
								this.props.onSecurityCodeChange(e, ReactDOM.findDOMNode(this).selectionStart)
							}}

					/>
				</div>
		)
	}
})

export default Input