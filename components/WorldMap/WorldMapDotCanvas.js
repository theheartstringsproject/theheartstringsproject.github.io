import React from 'react'
import ReactART from 'react-art'
import Cirlce from 'react-art/shapes/circle'
const Group = ReactART.Group
const Shape = ReactART.Shape
const Surface = ReactART.Surface
const Transform = ReactART.Transform

const WorldMapCanvas = (props) => (
	<Shape className={props.className} /*fillOpacity={props.fillOpacity} fill={props.fill} */cx={props.cx} cy={props.cy} radius="0.930903078"></Shape>
)

export default WorldMapCanvas