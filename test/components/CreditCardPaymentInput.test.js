import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import CreditCardPaymentInput from '../../components/Input/CreditCardPaymentInput'

// const DELETE_KEY_CODE = 46

function setup( propOverrides ) {
	const props = Object.assign({
		icon: 'back',
		placeholder: 'hi',
		payment: {
			cardNumber: '1234567891098876',
			expirationMonth: '12',
			expirationYear: '20',
			securityCode: '1234',
			currentField: 'CreditCardNumber'
		},
		onCreditCardChange: expect.createSpy(),
		onCreditCardFocus: expect.createSpy(),
	},  propOverrides)

	let renderer = TestUtils.createRenderer()
	renderer.render(<CreditCardPaymentInput {...props} />)
	let output = renderer.getRenderOutput()
	let instance = renderer.getMountedInstance()
	// instance.abbreviatedCardNumberGhost = document.createElement('div')
	// instance.cardNumberGhost = document.createElement('div')
	// instance.creditCardInput = document.createElement('div')
	// instance.originalCreditCardInputWidth = document.createElement('div')
	// instance.fields = document.createElement('div')

	return {
		props,
		output,
		renderer,
		instance
	}
}

describe('CreditCardPaymentInput', function() {
	it('should render an input field', function() {
		
		const { output } = setup()
		// let [ svg, fieldsContainer ] = output.props.children
		// let fields = fieldsContainer.props.children
		// let [ cardNumberInput, expirationDateInput, securityCodeInput ] = fields.props.children

		expect( output.type ).toBe('div')
		expect( output.props.className ).toBe('Input CreditCardPaymentInput CreditCardNumber')

		// Can't test types of children because they're wrapped in <Motion> object
		// expect( cardNumberInput.type ).toBe('input')
		// expect( cardNumberInput.props.className ).toBe('CardNumber')

		// expect( expirationDateInput.type ).toBe('input')
		// expect( expirationDateInput.props.className ).toBe('ExpirationDate')

		// expect( securityCodeInput.type ).toBe('input')
		// expect( securityCodeInput.props.className ).toBe('SecurityCode')
	})

	describe('Transitioning Between Fields', function() {
		describe('Getting Field Styles', function() {
			it('should return default styles if the field variables have not been initialized', function() {
				const { instance } = setup()
				expect( instance.getFieldStyles() ).toEqual({
					cardNumberFieldWidth: 200,
					cardNumberFieldLeftPosition: 0,
					otherFieldsWidth: 2
				})
			})

			it('should return default styles if the currentField is CreditCardNumber', function() {
				const { instance } = setup()
				expect( instance.getFieldStyles() ).toEqual({
					cardNumberFieldWidth: 200,
					cardNumberFieldLeftPosition: 0,
					otherFieldsWidth: 2
				})
			})

			it('should return a cardNumberFieldWidth equal to length of the numbers in the field', function() {
				const { instance } = setup({
					payment: { currentField: 'CreditCardExpirationDate' }
				})
				instance.cardNumberGhost = { scrollWidth: 100 }
				expect( instance.getFieldStyles().cardNumberFieldWidth ).toBe( 100 )
			})

			it('should return a cardNumberFieldLeftPosition equal to the negative difference between the size of the field and the size of the last 4 digits', function() {
				const { instance } = setup({
					payment: { currentField: 'CreditCardExpirationDate' }
				})
				instance.cardNumberGhost = { scrollWidth: 100 }
				instance.abbreviatedCardNumberGhost = { scrollWidth: 50 }
				expect( instance.getFieldStyles().cardNumberFieldLeftPosition ).toBe( -50 + 16 )
			})

			it('should return a otherFieldsWidth equal to half the remaining space in the field', function() {
				const { instance } = setup({
					payment: { currentField: 'CreditCardExpirationDate' }
				})
				instance.fields = { scrollWidth: 200 }
				instance.abbreviatedCardNumberGhost = { scrollWidth: 50 }
				expect( instance.getFieldStyles().otherFieldsWidth ).toBe( 75 - 16 )
			})
		})
	})

})

