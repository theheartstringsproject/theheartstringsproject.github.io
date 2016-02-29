import React from 'react'
import InlineSVG from 'svg-inline-react'
import './loading-page.css'

const amount = 5

const LoadingPage = (props) => (
	<div className='Page loading-page'>
		<div className='donation-icons'>
			<div className='charity-icon'>
				<InlineSVG src={require(`svg-inline!../../icons/heart-hands-circle.svg`)} />
			</div>
			<div className='donation-amount-icon'>
				<InlineSVG src={require(`svg-inline!../../icons/donate-amount-circle.svg`)} />
				<span className='donation-amount'>${amount}</span>
			</div>
		</div>
		<p>Processing your donation...</p>
	</div>
)

export default LoadingPage