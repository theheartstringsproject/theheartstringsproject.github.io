import React, { PropTypes } from 'react'
import FieldKit from 'field-kit';
import ReactDOM from 'react-dom'
import './input.css'
import './credit-card-payment-input.css'

const CreditCardExpirationDateInput = React.createClass({

	format: function( month = '', year = '' ) {

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

	unformat: function( date = '', cursorPosition = 0 ) {

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
		let month = this.props.expirationDate.values.month
		let year = this.props.expirationDate.values.year
		let previousMonthString = month ? month.toString() : ''
		let previousYearString = year ? year.toString().slice( 2, year.toString().length ) : ''
		let dateString = previousMonthString + previousYearString
		if (    newString === dateString &&                     // 1) the input value matches the expirationDate prop
				newString.length === dateString.length &&       // 2) they're both 2 digits
				cursorPosition === 2                            // 3) the caret position is at the end of the string
			)
		{
			newString = newString.slice( 0, 1 ) + '/' + newString.slice( 2, newString.length )
		}

		// Remove the slash that we'd previously added
		// newString = newString.replace(/\//, '')
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
				value={this.format( this.props.expirationDate.values.month, this.props.expirationDate.values.year )}
				style={this.props.style}
				placeholder="MM/YY"
				className="ExpirationDate"
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

export default CreditCardExpirationDateInput