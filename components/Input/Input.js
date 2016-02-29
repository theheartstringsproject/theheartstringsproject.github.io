import React from 'react'
import InlineSVG from 'svg-inline-react'
import './input.css'

const Input = (props) => (
	<div className="Input">
		<InlineSVG src={require(`svg-inline!../../icons/${props.icon}.svg`)} />
		<input placeholder={props.placeholder} value={props.value} />
	</div>
)

export default Input