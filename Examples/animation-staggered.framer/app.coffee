rows = 4
cols = 4

ballSize = 100
ballMargin = 40
ballCurve = "spring(300,20,0)"
startDelta = 200

[1..rows].map (a) ->
	[1..cols].map (b) ->
		ball = new View
			x: b * (ballSize + ballMargin)
			y: a * (ballSize + ballMargin) + startDelta
			width:  ballSize 
			height: ballSize
			opacity: 0

		R1 = 240 / cols * a 
		G1 = 220 / rows * b 
		B1 = 200 
		
		ball.style =
			backgroundColor: "rgba(#{R1},#{G1},#{B1},1)"
			borderRadius: "50%"
			border: "4px solid white"
			lineHeight: ball.height - 5 + "px"

		ball.html = "#{a}, #{b}"

		ball.states.add 'fadein',
			y: a * (ballSize + ballMargin)
			opacity: 1

		ball.states.animationOptions =
		curve: ballCurve

		ball.states.animationOptions.delay = 0.05 * a + 0.05 * b
		ball.states.switch 'fadein'

		
		

