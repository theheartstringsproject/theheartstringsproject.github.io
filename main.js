import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import campaign from './reducers'
import Campaign from './containers/Campaign'

let contribution = {
	charityName: 'United States Association for UNHCR',
	reason: 'Syrian refugees',
	amount: 0
}	

let store = createStore(campaign, {
	contribution: contribution,
	pages: [
		'LandingPage',
		'ContributionPage',
		'EmailPage',
		'PaymentPage',
		'ConfirmationPage',
		'LoadingPage',
		'ThanksPage'
	],
	currentPage: 0
})

render(
	<Provider store={store}>
		<Campaign />
	</Provider>,
	document.getElementById('root')
)