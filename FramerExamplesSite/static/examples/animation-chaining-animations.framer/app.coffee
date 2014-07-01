# Chaining Animations

# Setup
notification = new Layer x:0, y:0, width: 200, height: 100, scale: 0
notification.html = 'Click Me'
notification.style =
	fontSize: '16px'
	textAlign: 'center'
	lineHeight: '100px'
notification.center()

notification.animate
	properties: { scale: 1 }
	curve: 'spring'
	curveOptions:
		friction: 50
	
notification.on Events.Click, ->
	# First, we'll make it seem like the layer hinges off of its top left corner
	notification.originX = 0
	notification.originY = 0
	
	# Notice that we're assigning the result of the animate to a variable called hingeAnimation. This lets us refer to the animation that's about to run in other parts of the code
	hingeAnimation = notification.animate
		properties:
			rotationZ: 75
		curve: 'spring'
		curveOptions:
			tension: 900
			friction: 35
			velocity: 10
		
	# When the first animation ends, we'll drop the layer out of view
	hingeAnimation.on 'end', ->
		notification.animate
			properties:
				y: 768
				rotationZ: 45
			curve: 'cubic-bezier'
			time: 0.5
