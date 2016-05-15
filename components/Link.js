import React from 'react'

const Link = (props) => (
	<a className={`Link ${props.className}`}
		href={props.href ? props.href : '#'}
		target={props.target ? props.target : '_blank'}
		onClick={e => {
		// e.preventDefault()
		}}
	>
		{props.text}
	</a>
)

export default Link