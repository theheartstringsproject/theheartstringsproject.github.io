import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import CreditCardPaymentInput from '../components/Input/CreditCardPaymentInput'

function setup() {
	let props = {
		icon: 'back',
		placeholder: 'hi',
		value: 'there',
		onchange: expect.createSpy()
	}

	let renderer = TestUtils.createRenderer()
	renderer.render(<CreditCardPaymentInput {...props} />)
	let output = renderer.getRenderOutput()

	return {
		props,
		output,
		renderer
	}
}

describe('CreditCardPaymentInput', function() {
	it('should render an input field', function() {
		
		const { output } = setup()

		expect( output.type ).toBe('div')
	})
})

