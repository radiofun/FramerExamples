# Staggered Animation Example

# Initial Setup
commonStyle = fontSize: '16px', textAlign: 'center', lineHeight: '40px', backgroundColor: 'transparent'

tip1 = new Layer x:0, y:400, width:320, height:40
tip1.html = 'Should I bring an umbrella?'
tip2 = new Layer x:0, y:tip1.maxY + 10, width:320, height:40
tip2.html = 'Find my meeting notes'
tip3 = new Layer x:0, y:tip2.maxY + 10, width:320, height:40
tip3.html = 'Do I have new voicemail?'
tip4 = new Layer x:0, y:tip3.maxY + 10, width:320, height:40
tip4.html = 'Email Brian'
tip5 = new Layer x:0, y:tip4.maxY + 10, width:320, height:40
tip5.html = 'Did the Giants win?'

# Set initial state of our layers
for layer in [tip1, tip2, tip3, tip4, tip5]
	layer.style = commonStyle
	layer.opacity = 0
	
	# Add a "visible" state to each layer
	layer.states.add 'visible', 
		opacity: 1
		y: -> layer.y - 240
		
	layer.states.animationOptions =
		curve: 'spring'
		curveOptions:
			tension: 300
			friction: 50

# We'll increase the delay between animation a tiny bit every time one of them runs, but since the first animation is going to run without delay, we set it to 0
delay = 0

# Go through each layer and switch its state to "visible"
for layer in [tip1, tip2, tip3, tip4, tip5]
	layer.states.animationOptions.delay = delay
	layer.states.switch 'visible'
	
	# Increase the delay. The 2nd animation will get a delay of 0.1s, the 3rd - 0.2s, and so on
	delay += 0.1
