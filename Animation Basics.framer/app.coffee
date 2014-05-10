# Create a basic animation you just create a layer
layerA = new Layer width:80, height:80

# Start a simple animation for the x property to move down
layerA.animate
	properties: {y:300}
	
	
# Now let's create an animation with some more options
# the time property controls the speed of the animation

layerB = new Layer width:80, height:80, x:100, backgroundColor:"red"

layerB.animate
	properties: {y:300}
	time: 5

	
# The curve options determine the animation curve. The default
# is linear, but you can use a set of curves.

layerC = new Layer width:80, height:80, x:200, backgroundColor:"orange"

layerC.animate
	properties: {y:300}
	time: 5
	curve: "cubic-bezier"