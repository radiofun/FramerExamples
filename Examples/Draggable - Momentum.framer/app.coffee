# Create a new layer and center it
layerA = new Layer
layerA.center()

# Make the layer draggable
layerA.draggable.enabled = true

Utils.labelLayer layerA, "Drag me"

# Add an animation to the end of a drag to mimic momentum
layerA.on Events.DragEnd, (event, layer) ->
	
	# These are two variables you can tweak for different effects
	constant1 = 1000
	constant2 = 0
	
	# Calculate the current dragging velocity and add x and y up
	velocity = layer.draggable.calculateVelocity()
	totalVelocity = Utils.pointTotal Utils.pointAbs velocity

	# The momentum animation is actually a spring animation with
	# very high friction. You can change the the other spring
	# values for different effects
	animation = layer.animate
		properties:
			x: parseInt(layer.x + (velocity.x * constant1))
			y: parseInt(layer.y + (velocity.y * constant1))
		curve: "spring"
		curveOptions:
			friction: 100
			tension: 80
			velocity: totalVelocity * constant2