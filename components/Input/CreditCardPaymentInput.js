import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import InlineSVG from 'svg-inline-react'
import './input.css'
import './credit-card-payment-input.css'
import { spring, Motion } from 'react-motion'

// const DELETE_KEY_CODE = 46

// const Input = (props) => (
const Input = React.createClass({

	componentDidMount: function() {
		// debugger;
		// ReactDOM.findDOMNode(this).setSelectionRange( this.props.cardCursorPosition, this.props.cardCursorPosition );

		// Get the original width of the credit card input field
		if ( !this.originalCreditCardInputWidth ) {
			this.originalCreditCardInputWidth = this.creditCardInput.scrollWidth
		}
	},

	formatCardNumber: function( cardNumber = '' ) {

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

	formatExpirationDate: function( month = '', year = '' ) {

		let newMonth = month,
			newYear = year

		// Format the Year
		// ----------------
		// Remove the '20' from the beginning of the year
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

		return code

	},

	unformatCardNumber: function( cardNumber = '' ) {

		let newString = cardNumber

		// Remove any non-numerical characters
		newString = newString.replace(/\D/g,'')

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

	unformatSecurityCode: function( code = '' ) {

		let newString = code

		// Remove any non-numercal characters
		newString = newString.replace(/\D/g, '')

		// Return a maximum of 4 characters
		if ( newString.length > 4 ) {
			newString = newString.slice( 0, 4 )
		}

		return newString
	},

	render: function() {
		let creditCardNumberInputWidthWhenCurrentField = this.originalCreditCardInputWidth ? this.originalCreditCardInputWidth : 180
		let style = {
			cardNumberWidth: this.props.payment.currentField === 'CreditCardNumber' ? spring(creditCardNumberInputWidthWhenCurrentField) : spring(this.cardNumberGhost.scrollWidth),
			otherFieldsWidth: this.props.payment.currentField === 'CreditCardNumber' ? spring(2) : spring( ( (this.fields.scrollWidth - this.abbreviatedCardNumberGhost.scrollWidth) / 2) - 24 ),
			x: this.props.payment.currentField === 'CreditCardNumber' ? spring(0) : spring( -(this.cardNumberGhost.scrollWidth - this.abbreviatedCardNumberGhost.scrollWidth) )
		}
		if ( this.fields )
			console.log(this.fields.scrollWidth)

		return (<div className={`Input CreditCardPaymentInput ${this.props.payment.currentField}`}>
					<InlineSVG src={require(`svg-inline!../../icons/${this.props.icon}.svg`)} />
					<div className="fields-container">
						<Motion style={style}>
						{interpolatedStyle => {
							return (
								<div 	className="fields"
									 	key='fields'
										style={{
											// WebkitTransform: `translateX(${interpolatedStyle.x}px)`,
	          // 								transform: `translateX(${interpolatedStyle.x}px)`
										}}
										ref={(ref) => this.fields = ref}
								>
									<div 	className='AbbreviatedCardNumberGhost'
											ref={(ref) => this.abbreviatedCardNumberGhost = ref}>
												{this.formatCardNumber( this.props.payment.cardNumber ).slice( -5 )}
									</div>
									<div 	className='CardNumberGhost'
											ref={(ref) => this.cardNumberGhost = ref}>
												{this.formatCardNumber( this.props.payment.cardNumber )}
									</div>
									<input  placeholder="Card Number"
											className="CardNumber"
											value={this.formatCardNumber( this.props.payment.cardNumber )}
											style={{
												width: interpolatedStyle.cardNumberWidth + 'px',
												// WebkitTransform: `translateX(${interpolatedStyle.x}px)`,
	          									// transform: `translateX(${interpolatedStyle.x}px)`
	          									marginLeft: interpolatedStyle.x + 'px'
											}}
											ref={(ref) => this.creditCardInput = ref}
											onChange={e => {
												e.preventDefault()
												this.props.onCardNumberChange(
													this.unformatCardNumber( e.target.value.trim() ),
													e.target.selectionStart
												)
											}}
											onFocus={e => {
												this.props.onCardNumberFocus()
											}}
									/>
									<input  placeholder="MM/YY"
											className="ExpirationDate"
											value={this.formatExpirationDate( this.props.payment.expirationMonth, this.props.payment.expirationYear  )}
											style={{
												width: interpolatedStyle.otherFieldsWidth + 'px'
											}}
											onChange={e => {
												e.preventDefault()
												this.props.onExpirationDateChange(
													this.unformatExpirationDate( e.target.value.trim(), e.target.selectionStart ),
													e.target.selectionStart
												)
											}}
											onFocus={e => {
												this.props.onExpirationDateFocus()
											}}
									/>
									<input  placeholder="CVV"
											className="SecurityCode"
											value={this.formatSecurityCode( this.props.payment.securityCode )}
											style={{
												width: interpolatedStyle.otherFieldsWidth + 'px'
											}}
											onChange={e => {
												e.preventDefault()
												this.props.onSecurityCodeChange(
													this.unformatSecurityCode( e.target.value.trim() ),
													e.target.selectionStart
												)
											}}
											onFocus={e => {
												this.props.onSecurityCodeFocus()
											}}
									
									/>
								</div>
							)
						}}
						</Motion>
					</div>
				</div>
		)
	}
})

export default Input