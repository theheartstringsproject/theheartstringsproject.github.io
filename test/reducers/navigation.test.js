import expect from 'expect'
import reducer from '../../reducers/navigation'
import * as types from '../../constants/ActionTypes'
import * as cardStates from '../../constants/CreditCardInputStates'

let initialState = {
	currentPage: 0,
	previousPage: 0
}

describe('Navigation Reducer', function() {
	it('should return the initial state', function() {
		expect( reducer( undefined, {} ) ).toEqual( initialState )
	})

	it('should handle ADVANCE_PAGE', function() {
		expect( reducer( initialState, {
			type: types.ADVANCE_PAGE
		})).toEqual({
			currentPage: 1,
			previousPage: 0
		})
	})

	it('should handle RECEDE_PAGE', function() {
		expect( reducer( initialState, {
			type: types.RECEDE_PAGE
		})).toEqual({
			currentPage: 0,
			previousPage: 0
		})

		expect( reducer( {
			currentPage: 1,
			previousPage: 0
		}, {
			type: types.RECEDE_PAGE
		})).toEqual({
			currentPage: 0,
			previousPage: 1
		})
	})

	it('should handle JUMP_TO_PAGE', function() {
		expect( reducer( initialState, {
			type: types.JUMP_TO_PAGE,
			page: 3
		})).toEqual({
			currentPage: 3,
			previousPage: 0
		})
	})

	// it('should handle REQUEST_PAYMENT_TOKEN', function() {
	// 	epxect( reducer( [], {
	// 		type: types.REQUEST_PAYMENT_TOKEN
	// 	})).toEqual({
			
	// 	})
	// })
})