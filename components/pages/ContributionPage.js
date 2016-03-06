import React from 'react'
import InlineSVG from 'svg-inline-react'
import Link from '../Link'
import Button from '../Button/Button'
import BackButton from '../../containers/BackButton'
import ChooseAmountButton from '../../containers/ChooseAmountButton'
import './contribution-page.css'

const ContributionPage = React.createClass({
	render: function() {
		return (
			<div className='Page contribution-page' style={this.props.style}>
				<div className="contribution-buttons">
					<ChooseAmountButton text='$2' type='primary large circle contribution-button' amount='2' />
					<ChooseAmountButton text='$5' type='primary large circle contribution-button' amount='5' />
					<ChooseAmountButton text='$10' type='primary large circle contribution-button' amount='10' />
				</div>
			</div>
		)
	}
})

export default ContributionPage