# Parallax Example
# When you move your finger, the clouds will move along with it, but at different speeds.

# First, we'll set up the container for our prototype, which will act as a mask for all of our other layers
container = new Layer x:0, y:0, width:640, height:1136, image:"images/background.png"

# Then, we'll add three separate layers, each containing some clouds
layer3 = new Layer superLayer: container, x:-35, y:574, width:634, height:1718, image:"images/layer3.png"
layer2 = new Layer superLayer: container, x:-62, y:-55, width:750, height:2222, image:"images/layer2.png"
layer1 = new Layer superLayer: container, x:-62, y:86, width:750, height:1751, image:"images/layer1.png"

# We'll use this variable to store the y position of the last touch on the screen
lastYPosition = 0

# When the touch on the screen starts, we record its y position
container.on Events.TouchStart, (event) ->
	lastYPosition = event.y

# As the finger slides across the screen, we update the lastYPosition and calculate
# by how much we really moved (yDelta = lastYPosition - newTPosition).
container.on Events.TouchMove, (event) ->
	yDelta = lastYPosition - event.y
	lastYPosition = event.y

	# On every small movement, we update the y property of the cloud layers
	
	# The first one will move at the speed our finger is moving in, but in the opposite direction
	layer1.y += yDelta
	
	# The second one will move at one third the speed, in the same direction as our touch
	layer2.y -= yDelta * 0.3
	
	# The third one will move at double the speed, in the same direction as our touch
	layer3.y -= yDelta * 2