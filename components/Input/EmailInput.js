import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import InlineSVG from 'svg-inline-react'
import * as Icons from '../../constants/Icons'
import * as inputStates from '../../constants/InputStates'
import './input.css'

// const Input = (props) => (
const Input = React.createClass({

	getState: function( value = '' ) {
		let valid = /\S+@\S+\.\S+/.test( value )

		// If we've already attempted a validation
		// be aggressive about error states
		if ( this.props.email.hasAttemptedValidation ) {
			if ( !valid ) return inputStates.INVALID
		} else {
			if ( value === '' ) return inputStates.BLANK
			if ( !valid ) return inputStates.INCOMPLETE
		}

		return inputStates.VALID
	},

	render: function() {

		// Check whether we should render in an error state
		let icon = this.props.icon,
			errorClass = ''
		if ( this.getState( this.props.email.value ) === inputStates.INVALID ) {
			icon = Icons.ERROR_ICON
			errorClass = 'Error'
		}

		return (
			<div className={`Input EmailInput ${errorClass}`}>
				<InlineSVG src={require(`svg-inline!../../icons/${icon}.svg`)} />
				<input  placeholder={this.props.placeholder}
						type='email'
						className={`${errorClass}`}
						value={this.props.email.value}
						onChange={e => {
							e.preventDefault()
							let email = e.target.value.trim()
							this.props.onChange(
								email,
								this.getState( email )
							)
						}}
				/>
			</div>
		)
	}
})

export default Input