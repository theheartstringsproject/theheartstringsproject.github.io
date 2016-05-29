import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import CreditCardSecurityCodeInput from '../../components/Input/CreditCardSecurityCodeInput'
import * as inputStates from '../../constants/InputStates'

// const DELETE_KEY_CODE = 46

function setup( propOverrides ) {
	const props = Object.assign({
		style: '',
		placeholder: 'hi',
		className: 'there',
		securityCode: {
			status: inputStates.VALID,
			values: '',
			cursorPosition: 2
		},
		onChange: expect.createSpy(),
		onFocus: expect.createSpy(),
	},  propOverrides)

	let renderer = TestUtils.createRenderer()
	renderer.render(<CreditCardSecurityCodeInput {...props} />)
	let output = renderer.getRenderOutput()
	let instance = renderer.getMountedInstance()

	return {
		props,
		output,
		renderer,
		instance
	}
}

describe('CreditCardSecurityCodeInput', function() {
	it('should render an input field', function() {
		
		const { output } = setup()

		expect( output.type ).toBe('input')
		expect( output.props.className ).toBe('SecurityCode ')
	})

	it('should render an input field with an error when the date is invalid', function() {
		const { output } = setup({
			securityCode: {
				status: inputStates.INVALID,
				value: '',
				cursorPosition: 2
			}
		})
		expect( output.type ).toBe('input')
		expect( output.props.className.includes('Error') ).toBe( true )
	})

	describe('Formatting a Security Code', function() {
		it('should return a blank string when given an undefined input', function() {
			const { instance } = setup()
			expect( instance.format( undefined ) ).toBe('')
		})
	})

	describe('Unformatting a Security Code', function() {
		it('should only accept numbers', function() {
			const { instance } = setup()
			expect( instance.unformat('abcde') ).toBe('')

		})

		it('should accept a maximum of 4 digits', function() {
			const { instance } = setup()
			expect( instance.unformat('12345').length ).toBe( 4 )
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
			expect( instance.getState( '' ) ).toEqual( inputStates.BLANK )
		})

		it('should return INCOMPLETE when less than 3 digits', function() {
			const { instance } = setup()
			expect( instance.getState( '12' ) ).toEqual( inputStates.INCOMPLETE )
		})

		it('should return INVALID when Stripe does not approve', function() {
			const { instance } = setup()
			global.Stripe = {
				card: {
					validateCVC: function() {
						return false
					}	
				}
			}
			expect( instance.getState( 'invalid' ) ).toEqual( inputStates.INVALID )
		})

		it('should return VALID when Stripe approves', function() {
			const { instance } = setup()
			global.Stripe = {
				card: {
					validateCVC: function() {
						return true
					}	
				}
			}
			expect( instance.getState( '123' ) ).toEqual( inputStates.VALID )
			expect( instance.getState( '1234' ) ).toEqual( inputStates.VALID )
		})
	})
})