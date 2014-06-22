# Here I'll try to show off what dynamic properties are for a state
# machine. Let's begin by making a layer that you can drag around.

layerA = new Layer width:80, height:80, backgroundColor:"red"

Utils.labelLayer layerA, "Drag Me"

layerA.center()
layerA.draggable.enabled = true

# Now make a new layer with a two states that we will toggle between.
# But rather than toggling between a static value for x, we are going
# to define one state to be "next to layerA".

layerB = new Layer width:80, height:80, backgroundColor:"blue"

layerB.states.add
	topLeft:
		x:0
		y:0
	nextToLayerA:
		x: -> layerA.maxX
		y: -> layerA.y

# Notice how nextToLayerA defines x and y as a function that gets
# only calculated when the state switch takes place.
		
layerB.on Events.Click, ->
	layerB.states.next("nextToLayerA", "topLeft")