import React from 'react'
import WorldMapDot from './WorldMapDot'
import DOT_MAP from './dot-map.js'
import { VelocityComponent } from 'velocity-react';
import './world-map.css'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const DOT_AMOUNT = 10
const DOT_INTERVAL = 200
const ANIMATION_DURATION = 100

const WorldMap = React.createClass ({

	getInitialState: function() {
		let dots = new Array(DOT_AMOUNT)
		for (let i = 0 ; i < DOT_AMOUNT ; i++ ) {
			dots.push( this.getRandomDot() )
		}
		return { illuminatedDotIndices: dots }
	},

	componentDidMount: function() {
		// Set a new dot every so often
		setInterval(() => {
			if ( this.state.illuminatedDotIndices.length >= DOT_AMOUNT ) {
				this.setState({ illuminatedDotIndices: [...this.state.illuminatedDotIndices.slice(1), this.getRandomDot()] })	
			} else {
				this.setState({ illuminatedDotIndices: [...this.state.illuminatedDotIndices, this.getRandomDot()] })
			}
			
		}, DOT_INTERVAL);
	},

	getRandomDot: function() {
		return Math.floor(Math.random() * (DOT_MAP.length - 0)) + 0;
	},

	renderDot: function( index ) {
		const dot = DOT_MAP[index]
		return <WorldMapDot cx={dot.cx} cy={dot.cy} key={index} />
	},


	render: function() {

		// Create dot elements
		// let animationProps = { duration: ANIMATION_DURATION }
		let opacity, fill, key
		const dots = DOT_MAP.map((dot, i) => {			
			if (this.state.illuminatedDotIndices.includes( i )) {
				// animationProps.animation = {
				// 	opacity: 1.0,
				// 	fill: "#FFFFFF"
				// }
				opacity = 1.0
				fill = '#FFFFFF'
				key = 'on'
			} else {
				// animationProps.animation = {
				// 	opacity: 0.2,
				// 	fill: "#000000"
				// }
				opacity = 0.2
				fill = '#000000'
				key = 'off'
			}

			// return <VelocityComponent {...animationProps} key={i}>{this.renderDot(i)}</VelocityComponent>
			return <WorldMapDot fillOpacity={opacity} fill={fill} cx={dot.cx} cy={dot.cy} key={`dot-${i}`} />
					
		})

		return (
			<div className='world-map'>
				<svg /*width="351px" height="226px"*/ viewBox="0 0 351 226" version="1.1">
				    <title>Group</title>
				    <desc>Created with Sketch.</desc>
				    <defs></defs>
				    <g id="Explorations" stroke="none" strokeWidth="1" fill="none">
				        <g id="Heartstrings-Donation-Flow---CNN---01" transform="translate(-12.000000, -256.000000)">
				            <g id="Group" transform="translate(12.000000, 256.000000)">
				                <g id="Oval">
				                    <g>
										
				                    		{dots}
				                    </g>
				                </g>
				            </g>
				        </g>
				    </g>
				</svg>
			</div>
		)
	}
})
			

export default WorldMap