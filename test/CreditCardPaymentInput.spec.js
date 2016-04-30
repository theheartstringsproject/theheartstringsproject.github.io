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
		let [ svg, input ] = output.props.children

		expect( output.type ).toBe('div')
		expect( input.type ).toBe('input')
	})

	describe('Credit Card Number Field', function() {

		it('should add a space after the 4th character in a credit card number', function() {

			const { renderer } = setup()
			let instance = renderer.getMountedInstance()

			expect( instance.formatCardNumber('12345') ).toBe( '1234 5' )

		})

		it('should add a space after the 11th characters in a credit card number', function() {

			const { renderer } = setup()
			let instance = renderer.getMountedInstance()

			expect( instance.formatCardNumber('123456789109876') ).toBe( '1234 567891 09876' )
		})

		it('should only accept numbers', function() {

			const { renderer } = setup()
			let instance = renderer.getMountedInstance()

			expect( instance.formatCardNumber('abcde') ).toBe('')
		})
	})

	describe('Credit Card Expiration Date Field', function() {

		it('should only accept numbers', function() {

			const { renderer } = setup()
			let instance = renderer.getMountedInstance()

			expect( instance.formatExpirationDate('abcde') ).toBe('')

		})

		it('should accept a maximum of 4 digits', function() {

			const { renderer } = setup()
			let instance = renderer.getMountedInstance()

			expect( instance.formatExpirationDate('12345').replace(/\D/g, '').length ).toBe( 4 ) // Remove the added slash before counting
		})

		// it('should not allow a date in the past', function() {

		// 	const { renderer } = setup()
		// 	let instance = renderer.getMountedInstance()

		// 	expect( instance.formatExpirationDate('abcde') ).toBe('')
		// })

		it('should add a slash between the month and year', function() {

			const { renderer } = setup()
			let instance = renderer.getMountedInstance()

			expect( instance.formatExpirationDate('1216') ).toBe('12/16')
		})

		it('should not allow a month greater than 12', function() {

			const { renderer } = setup()
			let instance = renderer.getMountedInstance()

			expect( instance.formatExpirationDate('1316') ).toBe('12/16')
		})
	})

})

