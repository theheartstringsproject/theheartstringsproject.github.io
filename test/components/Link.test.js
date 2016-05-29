import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom'
import Link from '../../components/Link'

function setup( propOverrides ) {
	const props = Object.assign({
		href: '',
		text: '',
		className: '',
		onClick:  expect.createSpy()
	},  propOverrides)

	let renderer = TestUtils.createRenderer()
	renderer.render(<Link {...props} />)
	let output = renderer.getRenderOutput()
	let instance = renderer.getMountedInstance()

	return {
		props,
		output,
		renderer,
		instance
	}
}

describe('Link', function() {
	it('should render a link', function() {
		
		const { output } = setup()

		expect( output.type ).toBe('a')
		expect( output.props.className ).toBe('Link ')
		expect( output.props.href ).toBe('#')
		expect( output.props.target ).toBe('_blank')
	})

	it('should support a custom href', function() {
		const href = 'http://lakers.com'
		const { output } = setup({
			href
		})

		expect( output.props.href ).toBe( href )
	})

	it('should support a custom target', function() {
		const target = '_top'
		const { output } = setup({
			target
		})

		expect( output.props.target ).toBe( target )
	})
})
