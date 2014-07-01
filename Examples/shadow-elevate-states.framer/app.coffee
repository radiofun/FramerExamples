background = new BackgroundLayer backgroundColor:"rgba(77, 208, 225, 1.00)"

layer = new Layer 
	x:100, y:100, width:200, height:200, backgroundColor:"white"

layer.center()
layer.shadowColor = "rgba(0, 0, 0, 0.2)"
layer.style =
	"color": "black"
	"line-height": "200px"
	"text-align": "center"

# These are loosely based on the Google Material specs
layer.states.add
	elevatedZ1:
		shadowY: 2
		shadowBlur: 10
	elevatedZ2:
		shadowY: 6
		shadowBlur: 20
	elevatedZ3:
		shadowY: 12
		shadowBlur: 15
	elevatedZ4:
		shadowY: 16
		shadowBlur: 28
	elevatedZ5:
		shadowY: 27
		shadowBlur: 24
		
layer.states.animationOptions =
	curve: "ease-in"
	time: 0.15
		
layer.on Events.Click, ->
	layer.states.next()
	layer.html = layer.states.current

layer.html = "Click me"