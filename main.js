import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import campaign from './reducers'
import Campaign from './containers/Campaign'
import parseUri from './vendor/parse-uri'
import thunkMiddleware from 'redux-thunk'

// Set up Stripe
Stripe.setPublishableKey('pk_test_poxqEYDrVEjtlxvcwfVdlJ9q');

const charity = decodeURI( parseUri( window.location ).queryKey['charity'] )
const reason = decodeURI( parseUri( window.location ).queryKey['reason'] )

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

let store = createStore(campaign, {
	charity: {
		name: 'united states association for unhcr',
		formattedName: charity === "undefined" ? 'United States Association for UNHCR' : charity,
		reason: reason === "undefined" ? 'Syrian refugees' : reason,
		mission: 'Over 36 million people, mostly women and children, have fled persecution and war. Help the UN Refugee Agency ensure that they receive life-saving humanitarian aid.',
		charityURL: 'www.unrefugees.org',
		orgHunterURL: 'http://www.orghunter.com/organization/521662800'
	},
	contribution: {
		amount: 0
	}
}, applyMiddleware( thunkMiddleware, logger ))

render(
	<Provider store={store}>
		<Campaign />
	</Provider>,
	document.getElementById('root')
)