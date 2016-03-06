import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import InlineSVG from 'svg-inline-react'
import './input.css'

// const Input = (props) => (
const Input = React.createClass({

	componentDidMount: function() {
		console.log(ReactDOM.findDOMNode(this))
		// debugger;
		// ReactDOM.findDOMNode(this).setSelectionRange( this.props.cardCursorPosition, this.props.cardCursorPosition );
	},

	render: function() {
		return (<div className="Input">
					<InlineSVG src={require(`svg-inline!../../icons/${this.props.icon}.svg`)} />
					<input  placeholder={this.props.placeholder}
							value={this.props.value}
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