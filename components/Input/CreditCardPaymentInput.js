import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import InlineSVG from 'svg-inline-react'
import './input.css'

// const Input = (props) => (
const Input = React.createClass({

	componentDidMount: function() {
		// debugger;
		// ReactDOM.findDOMNode(this).setSelectionRange( this.props.cardCursorPosition, this.props.cardCursorPosition );
	},

	formatCardNumber: function( cardNumber ) {

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

	formatExpirationDate: function( date ) {

		let newString = date

		// Remove any non-numerical characters
		newString = newString.replace(/\D/g, '')

		// Return a maximum of 4 characters
		if ( newString.length > 4 ) {
			newString = newString.slice( 0, 4 )
		}

		// Add a slash as the 3rd character
		if ( newString.length > 2 ) {
			newString = [newString.slice(0, 2), '/', newString.slice(2)].join('')
		}

		// Don't allow a month greater than 12
		if ( newString.slice( 0, 2 ) > 12 ) {
			newString = newString.slice(0, 1) + '2' + newString.slice(2, newString.length)
		}

		return newString
	},

	render: function() {
		return (<div className="Input">
					<InlineSVG src={require(`svg-inline!../../icons/${this.props.icon}.svg`)} />
					<input  placeholder="Card Number"
							value={this.formatCardNumber( this.props.value )}
							onChange={e => {
								e.preventDefault()
								this.props.onChange(e, ReactDOM.findDOMNode(this).selectionStart)
							}}
					/>
					<input  placeholder="MM/YY"

					/>
					<input  placeholder="CVV"

					/>
				</div>
		)
	}
})

export default Input