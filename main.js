import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import campaign from './reducers'
import Campaign from './containers/Campaign'

let store = createStore(campaign, {
	contribution: {
		charityName: 'United States Association for UNHCR',
		// charityName: 'Global Citizen Year',
		reason: 'Syrian refugees',
		amount: 0
	},
	pages: [
		'LandingPage',
		'ContributionPage',
		'EmailPage',
		'PaymentPage',
		'ConfirmationPage',
		'LoadingPage',
		'ThanksPage'
	]
})

render(
	<Provider store={store}>
		<Campaign />
	</Provider>,
	document.getElementById('root')
)