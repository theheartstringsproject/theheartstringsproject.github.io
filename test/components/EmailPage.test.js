import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import PaymentPage from '../../components/pages/PaymentPage'
import PaymentEmailInput from '../../components/Input/PaymentEmailInput'
import Button from '../../components/Button/Button'
import * as cardStates from '../../constants/CreditCardInputStates'

function setup( propOverrides ) {
	const props = Object.assign({
		charityName: '',
		amount: 'hi',
		payment: {
			cardNumber: {
				status: '',
				value: '1234567891098876',
				cursorPosition: null
			},
			expirationDate: {
				status: '',
				values: {
					month: '12',
					year: '2020',
				},
				cursorPosition: null
			},
			securityCode: {
				status: '',
				value: '1234',
				cursorPosition: null
			},
			currentField: 'CreditCardNumber'
		},
		key: '',
	},  propOverrides)

	let renderer = TestUtils.createRenderer()
	renderer.render(<PaymentPage {...props} />)
	let output = renderer.getRenderOutput()
	let instance = renderer.getMountedInstance()

	return {
		props,
		output,
		renderer,
		instance
	}
}

describe('PaymentPage', function() {
	
})

