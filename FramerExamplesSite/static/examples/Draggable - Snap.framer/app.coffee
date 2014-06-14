# Create a new layer and center it
layerA = new Layer width:256, height:256
layerA.center()

originX = layerA.x
originY = layerA.y

layerA.image = "https://pbs.twimg.com/profile_images/442744361017540608/NCEct4yy.jpeg"

layerA.style =
	borderRadius: '50%',
	boxShadow: 'inset 0 0 0 10px #fff, 0 4px 12px rgba(0,0,0,0.4)'

# Make the layer draggable
layerA.draggable.enabled = true

# Add an animation to the end of a drag
layerA.on Events.DragEnd, (event, layer) ->

	# Snap back to origin
	animation = layer.animate
		properties:
			x: originX
			y: originY
		curve: "spring"
		curveOptions:
			friction: 20
			tension: 400
			velocity: 20