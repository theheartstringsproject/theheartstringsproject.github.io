import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import CreditCardNumberInput from '../../components/Input/CreditCardNumberInput'
import * as inputStates from '../../constants/InputStates'

// const DELETE_KEY_CODE = 46

function setup( propOverrides ) {
	const props = Object.assign({
		style: '',
		placeholder: 'hi',
		className: 'there',
		cardNumber: {
			status: inputStates.VALID,
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
		expect( output.props.className ).toBe('CardNumber ')
	})

	it('should render an input field with an error when the number is invalid', function() {
		const { output } = setup({
			cardNumber: { status: inputStates.INVALID }
		})
		expect( output.type ).toBe('input')
		expect( output.props.className.includes('Error') ).toBe( true )
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

	describe('Getting State', function() {

		// afterEach(function() {
		// 	delete Stripe
		// })

		it('should return BLANK when field is undefined', function() {
			const { instance } = setup()
			expect( instance.getState() ).toEqual( inputStates.BLANK )
		})

		it('should return BLANK when the number is blank', function() {
			const { instance } = setup()
			instance.field = { value: function() { return '' } }
			expect( instance.getState() ).toEqual( inputStates.BLANK )
		})

		it('should return INCOMPLETE when an amex number is less than the required character count', function() {
			const { instance } = setup()
			instance.field = {
				cardType: function() { return 'amex' },
				value: function() { return '3725000000' }
			}
			expect( instance.getState() ).toEqual( inputStates.INCOMPLETE )
		})

		it('should return INCOMPLETE when a non-amex number is less than the required character count', function() {
			const { instance } = setup()
			instance.field = {
				cardType: function() { return 'visa' },
				value: function() { return '424242424242' }
			}
			expect( instance.getState() ).toEqual( inputStates.INCOMPLETE )
		})

		it('should return INVALID when an amex number is the right character count but not valid', function() {
			const { instance } = setup()
			global.Stripe = {
				card: {
					validateCardNumber: function() {
						return false
					}	
				}
			}
			instance.field = {
				cardType: function() { return 'amex' },
				value: function() { return '372500000000000' }
			}
			expect( instance.getState() ).toEqual( inputStates.INVALID )
		})

		it('should return INVALID when a non-amex number is the right character count but not valid', function() {
			const { instance } = setup()
			global.Stripe = {
				card: {
					validateCardNumber: function() {
						return false
					}	
				}
			}
			instance.field = {
				cardType: function() { return 'visa' },
				value: function() { return '4242111111111111' }
			}
			expect( instance.getState() ).toEqual( inputStates.INVALID )
		})

		it('should return VALID when an amex card is the right character count and valid', function() {
			const { instance } = setup()
			global.Stripe = {
				card: {
					validateCardNumber: function() {
						return true
					}	
				}
			}
			instance.field = {
				cardType: function() { return 'amex' },
				value: function() { return '378282246310005' }
			}
			expect( instance.getState() ).toEqual( inputStates.VALID )
		})

		it('should return VALID when a non-amex card is the right character count and valid', function() {
			const { instance } = setup()
			global.Stripe = {
				card: {
					validateCardNumber: function() {
						return true
					}	
				}
			}
			instance.field = {
				cardType: function() { return 'visa' },
				value: function() { return '4242424242424242' }
			}
			expect( instance.getState() ).toEqual( inputStates.VALID )
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

