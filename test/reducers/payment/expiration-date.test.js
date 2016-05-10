import expect from 'expect'
import reducer from '../../../reducers/payment/expiration-date'
import * as types from '../../../constants/ActionTypes'
import * as inputStates from '../../../constants/InputStates'

const initialState = {
	status: '',
	values: {
		month: '',
		year: '',
	},
	cursorPosition: null
}

describe('Credit Card Expiration Date Reducer', function() {
	it('should return the initial state', function() {
		expect( reducer( undefined, {} ) ).toEqual( initialState )
	})

	it('should handle SET_CREDIT_CARD_EXPIRATION_DATE', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
			status: inputStates.VALID,
			expirationDate: '12/20',
			expirationDateCursorPosition: 2
		})).toEqual({
			status: inputStates.VALID,
			values: {
				month: '12',
				year: '2020',
			},
			cursorPosition: 2
		})

		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
			status: inputStates.INVALID,
			expirationDate: '',
			expirationDateCursorPosition: 2
		})).toEqual({
			status: inputStates.INVALID,
			values: {
				month: '',
				year: '',
			},
			cursorPosition: 2
		})
	})

	it('should handle SET_CREDIT_CARD_EXPIRATION_DATE without a year', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
			status: inputStates.INVALID,
			expirationDate: '12/',
			expirationDateCursorPosition: 2
		})).toEqual({
			status: inputStates.INVALID,
			values: {
				month: '12',
				year: ''
			},
			cursorPosition: 2
		})
	})

	it('should handle SET_CREDIT_CARD_EXPIRATION_DATE with an invalid month', function() {
		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
			status: inputStates.INVALID,
			expirationDate: '16/',
			expirationDateCursorPosition: 2
		})).toEqual({
			status: inputStates.INVALID,
			values: {
				month: '12',
				year: ''
			},
			cursorPosition: 2
		})

		expect( reducer( [], {
			type: types.SET_CREDIT_CARD_EXPIRATION_DATE,
			status: inputStates.INVALID,
			expirationDate: '43/16',
			expirationDateCursorPosition: 2
		})).toEqual({
			status: inputStates.INVALID,
			values: {
				month: '12',
				year: '2016'
			},
			cursorPosition: 2
		})
	})
})