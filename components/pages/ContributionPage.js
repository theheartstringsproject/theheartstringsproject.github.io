import React from 'react'
import InlineSVG from 'svg-inline-react'
import Link from '../Link'
import Button from '../Button/Button'
import BackButton from '../../containers/BackButton'
import ChooseAmountButton from '../../containers/ChooseAmountButton'
import './contribution-page.css'

const ContributionPage = (props) => (
	<div className='Page contribution-page'>
		<div className="Header">
			<nav>
				<BackButton type='tertiary circle' icon='back' />
				<div className='donation-icons'>
					<InlineSVG src={require(`svg-inline!../../icons/heart-hands-circle.svg`)} />
				</div>
				<Button type='tertiary circle' icon='info' />
			</nav>
			<p>How much would you like to donate to the <Link text={props.charityName} />?</p>
		</div>
		<div className="contribution-buttons">
			<ChooseAmountButton text='$2' type='primary large circle contribution-button' amount='2' />
			<ChooseAmountButton text='$5' type='primary large circle contribution-button' amount='5' />
			<ChooseAmountButton text='$10' type='primary large circle contribution-button' amount='10' />
		</div>
	</div>
)

export default ContributionPage