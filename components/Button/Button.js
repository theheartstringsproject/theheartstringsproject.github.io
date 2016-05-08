import React, { PropTypes } from 'react'
import InlineSVG from 'svg-inline-react'
import './button.css'

const Button = (props) => {
	let icon = null
	if (props.icon) icon = <InlineSVG src={require(`svg-inline!../../icons/${props.icon}.svg`)} />

	return (
		<button className={'button ' + 
							props.type + 
							(props.icon ? ' icon ' : '') +
							(props.iconPosition ? ' ' + props.iconPosition : '')}
			onClick={e => {
				e.preventDefault()
				props.onClick()
			}}
			disabled={props.disabled ? 'disabled' : ''}
		>
			{icon}
			{props.text}
		</button>
	)
}

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  disabled: PropTypes.bool
}

export default Button