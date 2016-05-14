import React from 'react'
import InlineSVG from 'svg-inline-react'
import Header from '../Header/Header'
import Link from '../Link'
import Button from '../Button/Button'
import BackButton from '../../containers/BackButton'
import './info-page.css'

const InfoPage = React.createClass({

	getMission: function() {
		if ( this.props.charity.mission ) {
			return 	<p className='charity-mission'>
						{this.props.charity.mission}<br />
						<Link text='Learn More' />.
					</p>
		} else {
			return 	<p className='charity-mission'>
						No mission statement is available for {this.props.charity.formattedName}. <Link text='Learn more about this organization from OrgHunter' />.
					</p>
		}
	},

	render: function() {
		return (
			<div className='Page info-page' style={this.props.style}>
				{this.getMission()}
				<hr />
				<p className='heartstrings-disclaimer'>The Heartstrings Project processes donations through <Link text='Stripe' /> and <Link text='Make My Donation' />. While we do not deduct any fees from your donation, Stripe deducts 2.9% + $0.30 processing and Make My Donation charges an additional 4.25%. Learn more about <Link text='The Heartstrings Project' />.
				</p>
				<div className='Footer'>
					<InlineSVG src={require(`svg-inline!../../icons/heartstrings.svg`)} />
				</div>
			</div>
		)
	}
})

export default InfoPage