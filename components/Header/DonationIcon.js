import React from 'react'
import { presets, spring, Motion } from 'react-motion'
import InlineSVG from 'svg-inline-react'

const DonationIcon = React.createClass({
	render: function() {
		console.log(this.props.style)
		return (
			<Motion style={this.props.style}>
			{styles => {
				return (
					<div className='charity-icon' key='charity-icon' style={{
						WebkitTransform: `translateX(${styles.x}px)`,
                  		transform: `translateX(${styles.x}px)`
					}}>
						<InlineSVG src={require(`svg-inline!../../icons/heart-hands-circle.svg`)} />
					</div>
				)
			}}
			</Motion>
		)
	}
})

export default DonationIcon