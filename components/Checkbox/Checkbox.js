import React from 'react'
import './checkbox.css'

const Checkbox = (props) => (
	<div className='Checkbox'>
		<input type='checkbox' id={props.name} checked={props.checked} defaultChecked='true'/>
	    <label htmlFor={props.name} >{props.label}</label>
    </div>
)

export default Checkbox