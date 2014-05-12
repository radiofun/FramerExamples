# Event Basics
#
# This example shows some of the basic ways to use events
# in Framer. To learn more, dive in to the documentation
# on events here: [link to events part of Framerjs.com]

# Set up some global constants
textStyle = { "font-size":"16px", "text-align":"center", "padding-top":"44px"}
curve1 = "spring(300,20,50)"

# Set up layers
layer1 = new Layer x:50, y:50, width:120, height:120, backgroundColor: "blue"
layer2 = new Layer x:200, y:50, width:120, height:120, backgroundColor: "green"
layer3 = new Layer x:350, y:50, width:120, height:120, backgroundColor: "red"


# Add instruction text to layers, and style them
layer1.html = "Hover Me"
layer2.html = "Click Me"
layer3.html = "Mouse Down"
layer1.style = textStyle
layer2.style = textStyle
layer3.style = textStyle

# On mouse over on the blue layer, shrink it, and mouseout, grow back 
# to original size.
layer1.on Events.MouseOver, ->
	layer1.animate
		properties:
			scale: 0.8
		curve: curve1
layer1.on Events.MouseOut, ->
	layer1.animate
		properties:
			scale: 1
		curve: curve1
		
# When the green layer is clicked, animate scale to 1.2, then after
# a 2 second delay, shrink back to original size. Events.Click
# is triggered on mouseup, or touchend for touch devices.
layer2.on Events.Click, ->
	layer2.animate
		properties:
			scale: 1.2
		curve: curve1
	Utils.delay 2, ->	
		layer2.animate
			properties:
				scale: 1
			curve: curve1

# When mouse down occurs on the red layer, shrink it, and when
# mouseup occurs, grow back to original size. Events.TouchStart
# and Events.TouchEnd are used as they return mouse events
# or touch events depending on device. If you don't care about 
# touch devices, you could use "mousedown" and "mouseup" instead.
layer3.on Events.TouchStart, ->
	layer3.animate
		properties:
			scale: 0.8
		curve: curve1
	layer3.html = "Mouse Up"
		
layer3.on Events.TouchEnd, ->
	layer3.animate
		properties:
			scale: 1
		curve: curve1
	layer3.html = "Mouse Down"
	