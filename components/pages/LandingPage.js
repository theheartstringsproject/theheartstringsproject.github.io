import React from 'react'
import InlineSVG from 'svg-inline-react'
import WorldMap from '../WorldMap/WorldMap'
import Link from '../Link'
import Button from '../Button/Button'
import MakeContributionButton from '../../containers/MakeContributionButton'
import './landing-page.css'

const LandingPage = React.createClass({
	render: function() {
		let url = this.props.charity.charityURL || this.props.charity.orgHunterURL
		return  (
			<div className='Page landing-page' style={this.props.style}>
				<h1>This story isn't over.</h1>
				<p>The author invites you to contribute to <Link text={this.props.charity.formattedName} href={url}/> to support {this.props.charity.reason}.</p>
				<MakeContributionButton text='Make a contribution' type='large primary contribute-button'/>
				<div className='Footer'>
					<small>Brought to you by <Link text={"The Heartstrings Project"} /></small>
					<InlineSVG src={require(`svg-inline!../../icons/heartstrings.svg`)} />
				</div>
			</div>
		)
	}
})

export default LandingPage