import React from 'react'
import InlineSVG from 'svg-inline-react'
import WorldMap from '../WorldMap/WorldMap'
import Link from '../Link'
import Button from '../Button/Button'
import MakeContributionButton from '../../containers/MakeContributionButton'
import './landing-page.css'

const LandingPage = React.createClass({
	render: function() {
		return  (
			<div className='Page landing-page' style={this.props.style}>
				<h1>This story isn't over.</h1>
				<p>The author invites you contribute to the <Link text={this.props.charityName} /> to support {this.props.reason}.</p>
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