import React from 'react'
import ReactDOM from 'react-dom'
import WorldMapDot from './WorldMapDot'
import DOT_MAP from './dot-map.js'
import { VelocityComponent } from 'velocity-react';
import './world-map.css'

const DOT_AMOUNT = 20
const DOT_INTERVAL = 200
const ANIMATION_DURATION = 100

const GIF_LENGTH = 5000
const NUMBER_OF_DOTS = DOT_AMOUNT + ( ( GIF_LENGTH / DOT_INTERVAL) )

const SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

const WorldMap = React.createClass ({
	mixins: [SetIntervalMixin],

	getInitialState: function() {
		let dots = new Array()
		for (let i = 0 ; i < DOT_AMOUNT ; i++ ) {
			dots.push( this.getRandomDot() )
		}
		this.dots = dots
		return { illuminatedDotIndices: dots }

		// let dots = new Array()
		// for ( let i = 0; i < NUMBER_OF_DOTS ; i++ ) {
		// 	dots.push( this.getRandomDot() )
		// }
		// this.dots = dots
		// this.dots = new Array( NUMBER_OF_DOTS ).map( this.getRandomDot() )
		// return { illuminatedDotIndices: dots.slice( -DOT_AMOUNT ) }
	},

	componentDidMount: function() {
		// Set a new dot every so often
		// setTimeout(() => {
			this.setInterval(this.illumateDots, DOT_INTERVAL)	
		// }, 3000)

		// this.illumateDots()
		
	},

	illumateDots: function() {
		// if ( this.state.illuminatedDotIndices.length >= DOT_AMOUNT ) {
		// 	this.setState({ illuminatedDotIndices: [...this.state.illuminatedDotIndices.slice(1), this.getRandomDot()] })	
		// } else {
		// 	this.setState({ illuminatedDotIndices: [...this.state.illuminatedDotIndices, this.getRandomDot()] })
		// }

		// Find the index of the dot we want to turn off,
		// which is the first one in the dots array
		if ( this.map ) {
			const dotToTurnOff = this.map.getElementsByTagName('ellipse')[ this.dots[0] ]
			ReactDOM.findDOMNode( dotToTurnOff ).className.baseVal = 'off'

			// Get a new dot to turn on
			const newDotIndex = this.getRandomDot()
			const dotToTurnOn = this.map.getElementsByTagName('ellipse')[ newDotIndex ]
			ReactDOM.findDOMNode( dotToTurnOn ).className.baseVal = 'on'

			// Make sure that the old dot is removed from the array
			// and that the new one is added, so it ultimately gets turned off
			this.dots.shift()
			this.dots.push( newDotIndex )
		}

		// if ( this.dots.length ) {
		// 	this.setState({ illuminatedDotIndices: [...this.state.illuminatedDotIndices.slice(1), this.dots[0]] })	
		// 	const newDot = this.dots.shift()
		// }

		// Move the newly illumated dot to the back of the queue
		
		// this.dots.push( newDot )
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
		let opacity, fill, key, className
		const dots = DOT_MAP.map((dot, i) => {			
			if (this.state.illuminatedDotIndices.includes( i )) {
				// animationProps.animation = {
				// 	opacity: 1.0,
				// 	fill: "#FFFFFF"
				// }
				opacity = 1.0
				fill = '#FFFFFF'
				key = 'on'
				className='on'
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
			return <WorldMapDot fillOpacity={opacity} fill={fill} cx={dot.cx} cy={dot.cy} key={`dot-${i}`} className={key}/>
					
		})

		return (
			<div className={`world-map-container ${this.props.position}`}>
				<div className="world-map">
					<svg /*width="351px" height="226px"*/ viewBox="0 0 351 226" version="1.1" ref={ref => this.map = ref}>
                		{dots}
					</svg>
				</div>
			</div>
		)
	}
})
			

export default WorldMap