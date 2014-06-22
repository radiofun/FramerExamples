# Changing the Animation Origin

# Setup
layer1 = new Layer x:0, y:0, width:128, height:128
layer2 = new Layer x:0, y:256, width:128, height:128, backgroundColor: 'orange'

# This defines the distance from the viewer to the elements in the view and makes 3D transformations appear "more 3D"
document.body.style.webkitPerspective = 1000

# Set the transform origin point of the layer to 0 0 (top left corner). Both values go from 0 to 1, so 0, 0.5 will be the middle of the left edge of the square, 1, 1 will be the bottom right corner. By default, the origin is set to the center of the layer (0.5, 0.5)
layer1.originX = 0
layer1.originY = 0

# Grow the square from the top left corner when clicked
layer1.on Events.Click, ->
	layer1.animate
		properties:
			scale: 2
		curve: 'spring'
		
# Rotate around the Y axis (right edge)
layer2.originX = 1
layer2.originY = 0.5

layer2.on Events.Click, ->
	layer2.animate
		properties:
			rotationY: 180
		curve: 'spring'
		curveOptions:
			friction: 100
			