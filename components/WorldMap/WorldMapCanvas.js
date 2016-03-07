import React from 'react'
import ReactART from 'react-art'
import WorldMapDotCanvas from './WorldMapDotCanvas'
const Group = ReactART.Group
const Shape = ReactART.Shape
const Surface = ReactART.Surface
const Transform = ReactART.Transform
import DOT_MAP from './dot-map.js'
import Circle from 'react-art/shapes/circle'
import Rectangle from 'react-art/shapes/rectangle'
import { spring, StaggeredMotion } from 'react-motion'

const DOT_AMOUNT = 10
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


const WorldMapCanvas = React.createClass({
	mixins: [SetIntervalMixin],

	getInitialState: function() {

		// let dots = new Array(DOT_AMOUNT)
		// for (let i = 0 ; i < DOT_AMOUNT ; i++ ) {
		// 	dots.push( this.getRandomDot() )
		// }
		// return { illuminatedDotIndices: dots }

		let dots = new Array()
		for ( let i = 0; i < NUMBER_OF_DOTS ; i++ ) {
			dots.push( this.getRandomDot() )
		}
		this.dots = dots
		return { illuminatedDotIndices: dots.slice( -DOT_AMOUNT ) }
	},

	componentDidMount: function() {
		// Set a new dot every so often
		// setTimeout(() => {
			this.setInterval(this.illumateDots, DOT_INTERVAL)	
		// }, 3000)
		
	},

	illumateDots: function() {
		// if ( this.state.illuminatedDotIndices.length >= DOT_AMOUNT ) {
		// 	this.setState({ illuminatedDotIndices: [...this.state.illuminatedDotIndices.slice(1), this.getRandomDot()] })	
		// } else {
		// 	this.setState({ illuminatedDotIndices: [...this.state.illuminatedDotIndices, this.getRandomDot()] })
		// }

		

		if ( this.dots.length ) {
			this.setState({ illuminatedDotIndices: [...this.state.illuminatedDotIndices.slice(1), this.dots[0]] })	
			const newDot = this.dots.shift()
			// this.dots.push( newDot )
		} else {
			this.intervals.forEach(clearInterval);
		}
		
		

		this.exportMap('map')
	},

	exportMap: function(fileName) {

		var canvasElement =  document.getElementsByTagName('canvas')[0];

		var MIME_TYPE = "image/png";

		var imgURL = canvasElement.toDataURL(MIME_TYPE);

		var dlLink = document.createElement('a');
		dlLink.download = fileName;
		dlLink.href = imgURL;
		dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

		document.body.appendChild(dlLink);
		dlLink.click();
		document.body.removeChild(dlLink);
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
		let fill

		const radius = window.innerWidth * (0.930903078 / 351)
		const height = window.innerWidth * (226 / 351)

		const dots = DOT_MAP.map((dot, i) => {	

			const x = ( dot.cx / 351 ) * window.innerWidth
			const y = ( dot.cy / 226 ) * height

			if (this.state.illuminatedDotIndices.includes( i )) {
				fill = '#FFFFFF'
			} else {
				fill = 'rgba(0,0,0,0.2)'
			}

			return <Circle x={x} y={y} radius={radius} key={`dot-${i}`} fill={fill}/>
		})
		
		return (
			<Surface width={window.innerWidth} height={window.innerHeight}>
				<Rectangle height={height} width={window.innerWidth} fill='#00AB6B' />
				{dots}
			</Surface>
		)
	}
})

export default WorldMapCanvas

// <Surface width={window.innerWidth} height={window.innerHeight}>
// 				{DOT_MAP.map( (dot, i) => {
// 					return (
// 						<Motion
// 							defaultStyle={{
// 								opacity: this.state.illuminatedDotIndices.includes( i ) ? 1 : 0.2
// 							}}
// 							style={{
// 								opacity: this.state.illuminatedDotIndices.includes( i ) ? spring(1) : spring(0.2)
// 							}}>
// 							{interpolatingStyle => {
// 								const key = `dot-${dot.cx}--${dot.cy}`
// 								const x = ( dot.cx / 351 ) * window.innerWidth
// 								const y = ( dot.cy / 226 ) * height
// 								return <Circle x={x} y={y} radius={radius} key={key} fill={`rgba(255,255,255,${interpolatingStyle.opacity})`}/>
// 							}}
// 						</Motion>
// 					)	
// 				})}
				
// 			</Surface>



// <StaggeredMotion
// 				defaultStyles={DOT_MAP.map((dot, i) => {
// 					return {
// 						opacity: this.state.illuminatedDotIndices.includes( i ) ? 1 : 0.2
// 					}
// 				})}
// 				styles={prevInterpolatedStyles => DOT_MAP.map((dot, i) => {
// 					return {
// 						opacity: this.state.illuminatedDotIndices.includes( i ) ? spring(1) : spring(0.2)
// 					}
// 				})}>
// 				{interpolatedStyles => 
// 					<Surface width={window.innerWidth} height={window.innerHeight}>
// 						{interpolatedStyles.map( (style, i) => {
// 							const cx = DOT_MAP[i].cx
// 							const cy = DOT_MAP[i].cy
// 							const key = `dot-${cx}-${cy}`
// 							const x = ( cx / 351 ) * window.innerWidth
// 							const y = ( cy / 226 ) * height
// 							return <Circle x={x} y={y} radius={radius} key={key} fill={`rgba(255,255,255,${style.opacity})`}/>
// 						})}
// 				</Surface>
// 				}
// 			</StaggeredMotion>