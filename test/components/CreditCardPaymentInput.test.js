import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import CreditCardPaymentInput from '../../components/Input/CreditCardPaymentInput'

// const DELETE_KEY_CODE = 46

function setup( propOverrides ) {
	const props = Object.assign({
		icon: 'back',
		placeholder: 'hi',
		payment: {
			cardNumber: '1234567891098876',
			expirationDate: '1220',
			securityCode: '1234'
		},
		onchange: expect.createSpy()
	},  propOverrides)

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
		describe('Formatting a Number', function() {
			it('should return a blank string when given an undefined input', function() {

				const { renderer } = setup()
				let instance = renderer.getMountedInstance()

				expect( instance.formatCardNumber( undefined ) ).toBe('')
			})

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

		describe('Unformatting a Number', function() {
			it('return a blank string when given an undefined input', function() {

				const { renderer } = setup()
				let instance = renderer.getMountedInstance()

				expect( instance.unformatCardNumber( undefined ) ).toBe('')
			})

			it('should remove the spaces we previously added', function() {

				const { renderer } = setup()
				let instance = renderer.getMountedInstance()

				expect( instance.unformatCardNumber( '1234 567891 09876' ) ).toBe('123456789109876')
			})
		})

			
	})

	describe('Credit Card Expiration Date Field', function() {
		describe('Formatting an Expiration Date', function() {
			it('should return a blank string when given an undefined input', function() {

				const { renderer } = setup()
				let instance = renderer.getMountedInstance()

				expect( instance.formatExpirationDate( undefined ) ).toBe('')
			})

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

				expect( instance.formatExpirationDate('12') ).toBe('12/')
				expect( instance.formatExpirationDate('1216') ).toBe('12/16')
			})

			it('should not allow a month greater than 12', function() {

				const { renderer } = setup()
				let instance = renderer.getMountedInstance()

				expect( instance.formatExpirationDate('1316') ).toBe('12/16')
				expect( instance.formatExpirationDate('4316') ).toBe('12/16')
			})
		})

		describe('Unformatting an Expiration Date', function() {
			it('should return a blank string when given an undefined input', function() {

				const { renderer } = setup()
				let instance = renderer.getMountedInstance()

				expect( instance.unformatExpirationDate( undefined ) ).toBe('')
			})

			it('should remove the slash we previously added', function() {

				const { renderer } = setup()
				let instance = renderer.getMountedInstance()

				expect( instance.unformatExpirationDate( '12/20' ) ).toBe( '1220' )
			})

			it('should remove the digit before the slash when the user deletes the slash character', function() {

				const { renderer } = setup({
					payment: {
						expirationDate: '12'
					}
				})
				let instance = renderer.getMountedInstance()

				// The function should know that if
				// 1) the input value matches the expirationDate prop
				// 2) they're both 2 digits
				// 3) the caret position is at the end of the string
				// the user deleted the slash and we should also delete the digit prior to it
				expect( instance.unformatExpirationDate( '12', 2 ) ).toBe( '1' )
			})
		})
	})

	describe('Credit Card Security Code Field', function() {
		it('should return a blank string when given an undefined input', function() {

			const { renderer } = setup()
			let instance = renderer.getMountedInstance()

			expect( instance.formatSecurityCode( undefined ) ).toBe('')
		})

		it('should only accept numbers', function() {

			const { renderer } = setup()
			let instance = renderer.getMountedInstance()

			expect( instance.formatSecurityCode('abcde') ).toBe('')

		})

		it('should accept a maximum of 4 digits', function() {

			const { renderer } = setup()
			let instance = renderer.getMountedInstance()

			expect( instance.formatSecurityCode('12345').length ).toBe( 4 )
		})
	})

})

