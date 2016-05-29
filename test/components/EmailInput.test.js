import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import EmailInput from '../../components/Input/EmailInput'
import * as inputStates from '../../constants/InputStates'

function setup( propOverrides ) {
	const props = Object.assign({
		icon: 'email',
		placeholder: 'hi',
		className: 'there',
		email: {
			status: inputStates.VALID,
			value: 'jeremy@lubin.com',
			hasAttemptedValidation: false
		},
		onChange: expect.createSpy(),
		onFocus: expect.createSpy(),
	},  propOverrides)

	let renderer = TestUtils.createRenderer()
	renderer.render(<EmailInput {...props} />)
	let output = renderer.getRenderOutput()
	let instance = renderer.getMountedInstance()

	return {
		props,
		output,
		renderer,
		instance
	}
}

describe('Input', function() {
	it('should render an input field', function() {
		
		const { output } = setup()

		let [ svg, input ] = output.props.children

		expect( output.type ).toBe('div')
		expect( output.props.className ).toBe('Input EmailInput ')

		// expect( svg.type ).toBe('svg')
		expect( input.type ).toBe('input')
	})

	it('should render an input field with an error when the value is invalid', function() {
		const { output } = setup({
			email: { status: inputStates.INVALID, hasAttemptedValidation: true }
		})
		expect( output.props.className.includes('Error') ).toBe( true )
	})

	describe('Validating an Email Address', function() {
		it('should not reject invald emails when no validation attempt has been made', function() {
			const { instance } = setup()
			expect( instance.getState( '' ) ).toBe( inputStates.BLANK )
			expect( instance.getState( 'je' ) ).toBe( inputStates.INCOMPLETE )
			expect( instance.getState( 'jeremy@' ) ).toBe( inputStates.INCOMPLETE )
			expect( instance.getState( 'jeremy@lubin' ) ).toBe( inputStates.INCOMPLETE )
		})

		it('should reject invald emails when a validation attempt has been made', function() {
			const { instance } = setup({
				email: { hasAttemptedValidation: true }
			})
			expect( instance.getState( '' ) ).toBe( inputStates.INVALID )
			expect( instance.getState( 'je' ) ).toBe( inputStates.INVALID )
			expect( instance.getState( 'jeremy@' ) ).toBe( inputStates.INVALID )
			expect( instance.getState( 'jeremy@lubin' ) ).toBe( inputStates.INVALID )
		})

		it('should accept valid emails', function() {
			const { instance } = setup()
			expect( instance.getState( 'jeremy@lubin.com' ) ).toBe( inputStates.VALID )
			expect( instance.getState( 'jeremy+test@lubin.com' ) ).toBe( inputStates.VALID )
		})
	})
})

