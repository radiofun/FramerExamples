background = new BackgroundLayer backgroundColor:"rgba(77, 208, 225, 1.00)"

layer = new Layer 
	x:100, y:100, width:200, height:200, backgroundColor:"white"

layer.center()
layer.shadowColor = "rgba(0, 0, 0, 0.2)"

layer.states.add
	elevatedZ4:
		shadowY: 16
		shadowBlur: 28
		shadowColor: "rgba(0, 0, 0, 0.22)"

layer.states.animationOptions =
	curve: "ease-in"
	time: 0.15
	
layer.draggable.enabled = true

layer.on Events.DragStart, ->
	layer.states.switch("elevatedZ4")

layer.on Events.DragEnd, ->
	layer.states.switch("default")