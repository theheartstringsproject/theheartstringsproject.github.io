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

		let newString = cardNumber,
			i = 0

		if ( newString.length <= 4 )
			return newString

		// for ( ; i < cardNumber.length - 4 ; i++ ) {
		// 	newString += '•'
		// }

		// newString += cardNumber.slice(-4)

		if ( newString.length > 4 ) {
			newString = [newString.slice(0, 4), ' ', newString.slice(4)].join('')
		}

		if ( newString.length > 11 ) {
			newString = [newString.slice(0, 11), ' ', newString.slice(11)].join('')
		}

		return newString
	},

	render: function() {
		return (<div className="Input">
					<InlineSVG src={require(`svg-inline!../../icons/${this.props.icon}.svg`)} />
					<input  placeholder={this.props.placeholder}
							value={this.formatCardNumber( this.props.value )}
							onChange={e => {
								e.preventDefault()
								this.props.onChange(e, ReactDOM.findDOMNode(this).selectionStart)
							}}
					/>
				</div>
		)
	}
})

export default Input