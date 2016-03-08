import React from 'react'
import InlineSVG from 'svg-inline-react'
import Link from '../Link'
import Button from '../Button/Button'
import Header from '../Header/Header'
import MakeAnotherContributionButton from '../../containers/MakeAnotherContributionButton'
import './thanks-page.css'

const ThanksPage = React.createClass({
	render: function() {
		return (
			<div className='Page thanks-page' style={this.props.style}>
				<Header charityName={this.props.contribution.charityName} reason={this.props.contribution.reason} amount={this.props.contribution.amount} pageName={this.props.pageName} key='thanks-header'/>
				<div className="share-buttons">
					<Button type='primary circle share-button' icon='twitter'/>
					<Button type='primary circle share-button' icon='facebook'/>
					<Button type='primary circle share-button' icon='email'/>
				</div>
				<MakeAnotherContributionButton text='Make Another Donation' type='secondary another-donation-button' iconPosition='right'/>
				<div className='Footer'>
					<small>
						XOXO,<br />
						<Link text="The Heartstrings Project" />
					</small>
				</div>
			</div>
		)
	}
})

export default ThanksPage