import expect from 'expect'
import reducer from '../../reducers/charity'
import * as types from '../../constants/ActionTypes'

const initialState = {
	name: '',
	formattedName: '',
	mission: '',
	charityURL: '',
	orgHunterURL: ''
}

describe('Charity Reducer', function() {
	it('should return the initial state', function() {
		expect( reducer( undefined, {} ) ).toEqual( initialState )
	})

	it('should handle SET_CHARITY', function() {
		expect( reducer( [], {
			type: types.SET_CHARITY,
			name: 'united states association for unhcr',
			formattedName: 'United States Association for UNHCR',
			mission: 'Over 36 million people, mostly women and children, have fled persecution and war. Help the UN Refugee Agency ensure that they receive life-saving humanitarian aid.',
			charityURL: 'www.unrefugees.org',
			orgHunterURL: 'http://www.orghunter.com/organization/521662800'
		})).toEqual({
			name: 'united states association for unhcr',
			formattedName: 'United States Association for UNHCR',
			mission: 'Over 36 million people, mostly women and children, have fled persecution and war. Help the UN Refugee Agency ensure that they receive life-saving humanitarian aid.',
			charityURL: 'www.unrefugees.org',
			orgHunterURL: 'http://www.orghunter.com/organization/521662800'
		})
	})
})