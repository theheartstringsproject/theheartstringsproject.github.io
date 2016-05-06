import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import CreditCardExpirationDateInput from '../../components/Input/CreditCardExpirationDateInput'
import * as cardStates from '../../constants/CreditCardInputStates'

// const DELETE_KEY_CODE = 46

function setup( propOverrides ) {
	const props = Object.assign({
		style: '',
		placeholder: 'hi',
		className: 'there',
		expirationDate: {
			status: cardStates.VALID,
			values: {
				month: '',
				year: ''
			},
			cursorPosition: 2
		},
		onChange: expect.createSpy(),
		onFocus: expect.createSpy(),
	},  propOverrides)

	let renderer = TestUtils.createRenderer()
	renderer.render(<CreditCardExpirationDateInput {...props} />)
	let output = renderer.getRenderOutput()
	let instance = renderer.getMountedInstance()

	return {
		props,
		output,
		renderer,
		instance
	}
}

describe('CreditCardExpirationDateInput', function() {
	it('should render an input field', function() {
		
		const { output } = setup()

		expect( output.type ).toBe('input')
		expect( output.props.className ).toBe('ExpirationDate')
	})

	describe('Formatting an Expiration Date', function() {
		it('should return a blank string when given an undefined input', function() {
			const { instance } = setup()
			expect( instance.format( undefined, undefined ) ).toBe('')
		})

		it('should return a blank string if only a year is provided', function() {
			const { instance } = setup()
			expect( instance.format( undefined, '2016' ) ).toBe('')
		})

		// it('should not allow a date in the past', function() {
		// 	const { instance } = setup()
		// 	expect( instance.formatExpirationDate('abcde') ).toBe('')
		// })

		it('should add a slash between the month and year', function() {
			const { instance } = setup()
			expect( instance.format( '12' ) ).toBe('12/')
			expect( instance.format( '12', '2016' ) ).toBe('12/16')
		})
	})

	describe('Unformatting an Expiration Date', function() {
		it('should return a blank string when given an undefined input', function() {
			const { instance } = setup()
			expect( instance.unformat( undefined, undefined ) ).toBe('')
		})

		it('should only accept numbers', function() {
			const { instance } = setup()
			expect( instance.unformat('abcd') ).toBe('')

		})

		// it('should not allow a month greater than 12', function() {

		// 	const { renderer } = setup()
		// 	let instance = renderer.getMountedInstance()

		// 	expect( instance.unformatExpirationDate( '13/' ) ).toBe( '12/' )
		// 	expect( instance.unformatExpirationDate( '43/' ) ).toBe( '12/' )
		// 	expect( instance.unformatExpirationDate( '13/16' ) ).toBe('12/16')
		// 	expect( instance.unformatExpirationDate( '43/16' ) ).toBe('12/16')
		// })

		it('should accept a maximum of 4 digits', function() {
			const { instance } = setup()
			expect( instance.unformat('12345').replace(/\D/g, '').length ).toBe( 4 ) // Remove the added slash before counting
		})

		// it('should remove the slash we previously added', function() {
		// 	const { instance } = setup()
		// 	expect( instance.unformatExpirationDate( '12/20' ) ).toBe( '1220' )
		// })

		it('should remove the digit before the slash when the user deletes the slash character and there is no year', function() {

			let { instance } = setup({
				expirationDate: {
					values: {
						month: '12',
						year: ''
					}
				}
			})

			// The function should know that if
			// 1) the input value matches the expirationDate prop
			// 2) they're both 2 digits
			// 3) the caret position is at the end of the string
			// the user deleted the slash and we should also delete the digit prior to it
			expect( instance.unformat( '12', 2 ) ).toBe( '1/' )
		})

		it('should remove the digit before the slash when the user deletes the slash character and there is a year', function() {

			let { instance } = setup({
				expirationDate: {
					values: {
						month: '12',
						year: '2020'
					}
				}
			})

			expect( instance.unformat( '1220', 2 ) ).toBe( '1/20' )
		})
	})
})