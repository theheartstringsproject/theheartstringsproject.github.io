import React from 'react'
import InlineSVG from 'svg-inline-react'
import Link from '../Link'
import Button from '../Button/Button'
import MakeAnotherContributionButton from '../../containers/MakeAnotherContributionButton'
import './thanks-page.css'

const ThanksPage = (props) => (
	<div className='Page thanks-page'>
		<div className="Header">
			<nav>
				<div className="donation-icons">
					<InlineSVG src={require(`svg-inline!../../icons/check-circle-large.svg`)} />
				</div>
			</nav>
			<p>Thanks! Share this article to help others make a difference</p>
		</div>
		<div className="share-buttons">
			<Button type='primary circle share-button' icon='twitter'/>
			<Button type='primary circle share-button' icon='facebook'/>
			<Button type='primary circle share-button' icon='email'/>
		</div>
		<MakeAnotherContributionButton text='Make Another Donation' type='secondary small another-donation-button' iconPosition='right'/>
		<div className='Footer'>
			<small>
				XOXO,<br />
				<Link text="The Heartstrings Project" />
			</small>
			
		</div>
	</div>
)

export default ThanksPage