layerA = new Layer width:100, height:100, backgroundColor:"#28acff", borderRadius: "6px"
Utils.labelLayer layerA, "Draggable"
layerA.center()
layerA.draggable.enabled = true

# Rather than toggling between a static value for x, 
# we define one state to be "next to layerA"
layerB = new Layer width: 100, height: 100, backgroundColor:"#7ed6ff", borderRadius: "6px"
layerB.states.add
	topLeft:
		x:0
		y:0
	nextToLayerA:
		x: -> layerA.maxX
		y: -> layerA.y

# Notice how nextToLayerA defines x and y as a function
# that only gets calculated when the state switch takes place.
layerB.on Events.Click, ->
	layerB.states.next("nextToLayerA", "topLeft")
layerB.states.animationOptions =
  curve: "spring(200, 20, 10)"

  