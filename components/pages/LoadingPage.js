import React from 'react'
import InlineSVG from 'svg-inline-react'
import './loading-page.css'

const amount = 5

const LoadingPage = React.createClass({
	render: function() {
		return (
			<div className='Page loading-page' style={this.props.style}></div>
		)
	}
})

export default LoadingPage