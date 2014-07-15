#Material Transition Example

#Global Values 
mdelay = 0.1
originposition = 800
originposition2 = 1400
animatedposition = 870

#Setting up the Layers
bglayer = new Layer x:0, y:0, width:540, height:960, backgroundColor:'#e5e5e5'
topbar = new Layer 
	x:0, y:0, width:540, height:232, image:"images/Top Bar.png"
contentcard = new Layer 
	x:15, y:260, width:508, height:510, image:"images/card.png"

for count in [0...4]
	smallcard = new Layer x:15+count*129, y:originposition, width:118, height:118, image:"images/card_small.png"
	
overlaylayer = new Layer width:540, height:960, backgroundColor:'#e5e5e5', opacity:0
container = new Layer x:-205, y:560, width:540, height:300, backgroundColor:'transparent'
documentlayer = new Layer x:0, y:0, width:540, height:960,backgroundColor:'transparent'
newcard = new Layer 
	x:15, y:970, width:508, height:510, image:"images/card_new.png", rotation:3				
logobase = new Layer x:0, y:0, width:228, height:228, image:"images/logo.png", scale:0.25
nytlogo = new Layer x:0, y:0, width:80, height:107, image:"images/nytlogo.png", scale:0.25	

#Setting up the Positions
container.addSubLayer(logobase)
container.addSubLayer(nytlogo)
logobase.center()
nytlogo.center()
documentlayer.addSubLayer(newcard)
	
#Animation
contentcard.on Events.Click,->	
	logobase.animate
		delay:mdelay
		properties:
			x:200
			y:-20
			scale:5
		curve:'spring(50,12,0)'

	nytlogo.animate
		delay:mdelay
		properties:
			x:220
			y:100
			scale:0.5
		curve:'spring(100,12,0)'

	overlaylayer.animate
		properties:
			opacity:1
		curve:'spring(100,12,0)'

	newcard.animate
		properties:
			y:330
			rotation:0
		curve:'spring(50,12,0)'		
			
	container.animate
		delay:mdelay
		properties:
			x:0
			y:0
		curve:'easeInOutCubic'	
		time:0.3
		
	for count in [5...9]
		newsmallcard = new Layer x:15+(count-5)*129, y:originposition2, width:118, height:118, rotation:8, image:"images/card_small.png"
		
		documentlayer.addSubLayer(newsmallcard)
		
		newsmallcard.animate
			delay:(count-4)*0.05
			properties:
				y:animatedposition
				rotation:0
			curve:'spring(50,12,0)'