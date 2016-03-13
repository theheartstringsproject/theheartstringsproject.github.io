import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import campaign from './reducers'
import Campaign from './containers/Campaign'
import parseUri from './vendor/parse-uri'

const charity = decodeURI( parseUri( window.location ).queryKey['charity'] )
const reason = decodeURI( parseUri( window.location ).queryKey['reason'] )

let store = createStore(campaign, {
	contribution: {
		charityName: charity === "undefined" ? 'United States Association for UNHCR' : charity,
		// charityName: 'Global Citizen Year',
		reason: reason === "undefined" ? 'Syrian refugees' : reason,
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