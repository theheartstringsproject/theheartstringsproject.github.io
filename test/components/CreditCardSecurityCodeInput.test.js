import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import CreditCardSecurityCodeInput from '../../components/Input/CreditCardSecurityCodeInput'
import * as cardStates from '../../constants/CreditCardInputStates'

// const DELETE_KEY_CODE = 46

function setup( propOverrides ) {
	const props = Object.assign({
		style: '',
		placeholder: 'hi',
		className: 'there',
		securityCode: {
			status: cardStates.VALID,
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
		expect( output.props.className ).toBe('SecurityCode')
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
})