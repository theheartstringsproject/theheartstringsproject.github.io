import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import CreditCardNumberInput from '../../components/Input/CreditCardNumberInput'
import * as cardStates from '../../constants/CreditCardInputStates'

// const DELETE_KEY_CODE = 46

function setup( propOverrides ) {
	const props = Object.assign({
		style: '',
		placeholder: 'hi',
		className: 'there',
		cardNumber: {
			status: cardStates.VALID,
			value: '4242424242424242',
			cursorPosition: 2
		},
		onChange: expect.createSpy(),
		onFocus: expect.createSpy(),
	},  propOverrides)

	let renderer = TestUtils.createRenderer()
	renderer.render(<CreditCardNumberInput {...props} />)
	let output = renderer.getRenderOutput()
	let instance = renderer.getMountedInstance()

	return {
		props,
		output,
		renderer,
		instance
	}
}

describe('CreditCardNumberInput', function() {
	it('should render an input field', function() {
		
		const { output } = setup()

		expect( output.type ).toBe('input')
		expect( output.props.className ).toBe('CardNumber')
	})

	describe('Formatting a Number', function() {
		it('should return a blank string when given an undefined input', function() {
			const { instance } = setup()
			expect( instance.format( undefined ) ).toBe('')
		})

		it('should add a space after the 4th character in a credit card number', function() {
			const { instance } = setup()
			expect( instance.format('12345') ).toBe( '1234 5' )

		})

		it('should add a space after the 11th characters in a credit card number', function() {
			const { instance } = setup()
			expect( instance.format('123456789109876') ).toBe( '1234 567891 09876' )
		})
	})

	describe('Unformatting a Number', function() {
		it('return a blank string when given an undefined input', function() {
			const { instance } = setup()
			expect( instance.unformat( undefined ) ).toBe('')
		})

		it('should remove the spaces we previously added', function() {
			const { instance } = setup()
			expect( instance.unformat( '1234 567891 09876' ) ).toBe('123456789109876')
		})

		it('should only accept numbers', function() {
			const { instance } = setup()
			expect( instance.unformat('abcde') ).toBe('')
		})
	})

	describe('Knowing When Editing is Finished', function() {
		it('should return false if the field has not been defined', function() {
			const { instance } = setup()
			expect( instance.isDoneEditing() ).toBe(false)
		})

		it('should return false if cardtype is not amex and there are less than 16 digits', function() {
			const { instance } = setup()
			instance.field = {
				cardType: function() { return 'visa' },
				value: function() { return '424242424242' }
			}
			expect( instance.isDoneEditing() ).toBe(false)
		})

		it('should return false if cardtype is amex and there are less than 15 digits', function() {
			const { instance } = setup()
			instance.field = {
				cardType: function() { return 'amex' },
				value: function() { return '3725000000' }
			}
			expect( instance.isDoneEditing() ).toBe(false)
		})

		it('should return true if cardtype is not amex and there are 16 digits', function() {
			const { instance } = setup()
			instance.field = {
				cardType: function() { return 'visa' },
				value: function() { return '4242424242424242' }
			}
			expect( instance.isDoneEditing() ).toBe(true)
		})

		it('should return true if cardtype is amex and there are 15 digits', function() {
			const { instance } = setup()
			instance.field = {
				cardType: function() { return 'amex' },
				value: function() { return '372500000098765' }
			}
			expect( instance.isDoneEditing() ).toBe(true)
		})
	})

})

