import React from 'react'
import Link from '../Link'
import Button from '../Button/Button'
import InlineSVG from 'svg-inline-react'

const Header = (props) => (
	<div className='Header'>
		<Button text='Back' type='tertiary circle' icon='back' />
		<Button text='Info' type='tertiary circle' icon='info' />
		<p>{props.text}/></p>
	</div>
)

export default Header