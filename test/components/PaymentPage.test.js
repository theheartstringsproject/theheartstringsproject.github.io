import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import PaymentPage from '../../components/pages/PaymentPage'
import CreditCardPaymentInput from '../../components/Input/CreditCardPaymentInput'
import Checkbox from '../../components/Checkbox/Checkbox'
import Button from '../../components/Button/Button'
import * as inputStates from '../../constants/InputStates'
import * as paymentFormStates from '../../constants/PaymentFormStates'

function setup( propOverrides ) {
	const props = Object.assign({
		charityName: '',
		amount: 'hi',
		payment: {
			cardNumber: {
				status: '',
				value: '1234567891098876',
				cursorPosition: null
			},
			expirationDate: {
				status: '',
				values: {
					month: '12',
					year: '2020',
				},
				cursorPosition: null
			},
			securityCode: {
				status: '',
				value: '1234',
				cursorPosition: null
			},
			formStates: {
				currentField: paymentFormStates.CARD_NUMBER		
			}
		},
		key: '',
	},  propOverrides)

	let renderer = TestUtils.createRenderer()
	renderer.render(<PaymentPage {...props} />)
	let output = renderer.getRenderOutput()
	let instance = renderer.getMountedInstance()

	return {
		props,
		output,
		renderer,
		instance
	}
}

describe('PaymentPage', function() {
	it('should render the correct components', function() {
		
		const { output } = setup()
		let [ input, checkbox, button ] = output.props.children

		expect( output.type ).toBe('div')
		expect( output.props.className ).toBe('Page payment-page')

		expect( input.type.WrappedComponent ).toBe(CreditCardPaymentInput)
		expect( checkbox.type ).toBe(Checkbox)
		expect( button.type.WrappedComponent ).toBe(Button)
	})

	describe('Checking for Valid Payment', function() {
		it('should return false if the credit card number is not VALID', function() {
			const { instance } = setup({ payment: {
				cardNumber: {
					status: inputStates.INVALID
				},
				expirationDate: {
					status: inputStates.VALID
				},
				securityCode: {
					status: inputStates.VALID
				}
			}})

			expect( instance.isPageValid() ).toBe( false )
		})

		it('should return false if the expiration date is not VALID', function() {
			const { instance } = setup({ payment: {
				cardNumber: {
					status: inputStates.VALID
				},
				expirationDate: {
					status: inputStates.BLANK
				},
				securityCode: {
					status: inputStates.VALID
				}
			}})

			expect( instance.isPageValid() ).toBe( false )
		})

		it('should return false if the security code is not VALID', function() {
			const { instance } = setup({ payment: {
				cardNumber: {
					status: inputStates.VALID
				},
				expirationDate: {
					status: inputStates.VALID
				},
				securityCode: {
					status: inputStates.INCOMPLETE
				}
			}})

			expect( instance.isPageValid() ).toBe( false )
		})

		it('should return true if all three are VALID', function() {
			const { instance } = setup({ payment: {
				cardNumber: {
					status: inputStates.VALID
				},
				expirationDate: {
					status: inputStates.VALID
				},
				securityCode: {
					status: inputStates.VALID
				}
			}})

			expect( instance.isPageValid() ).toBe( true )
		})

	})
})

