import React from 'react'

const Link = (props) => (
	<a className='Link'
		href="#"
		onClick={e => {
		e.preventDefault()
		}}
	>
		{props.text}
	</a>
)

export default Link