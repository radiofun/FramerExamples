PSD = Framer.Importer.load "imported/Pull to refresh"

PSD.spinner.scale = 0
deltaY = 0
startY = 0
timelineStartY = PSD.timeline.y
animating = false
springCurve = "spring(200,20,0)"


PSD.timeline.on Events.TouchStart, (event) ->
	startY = event.y
	PSD.spinner.scale = 0
	PSD.spinner.rotation = 0
	PSD.arrow.scale = 1 
	PSD.arrow.rotation = 0

PSD.timeline.on Events.TouchMove, (event) ->
	deltaY = startY - event.y
	PSD.timeline.y = timelineStartY - deltaY
	PSD.refreshControl.y = PSD.timeline.y - 70
	
	if deltaY < -100
		if animating == false
			PSD.arrow.animate
				properties:
					rotation: 180
				curve: springCurve
			animating = true
	else
		if animating == true
			PSD.arrow.animate
				properties:
					rotation: 0
				curve: springCurve
			animating = false

PSD.timeline.on Events.TouchEnd, ->
	if deltaY < -100
		PSD.refreshControl.animate 
			properties:
				y: timelineStartY + 25
			curve: springCurve
		PSD.arrow.animate 
			properties:
				scale: 0
			curve: springCurve
		PSD.spinner.animate 
			properties:
				scale: 1
			curve: springCurve
		PSD.spinner.animate 
			properties:
				rotation: 720
			time: 2
		PSD.timeline.animate
			properties:
				y: timelineStartY + 100
			curve: springCurve
		Utils.delay 2, ->
			PSD.refreshControl.animate 
				properties:
					y: timelineStartY - 70
				curve: springCurve
			PSD.timeline.animate
				properties:
					y: timelineStartY
				curve: springCurve
	else
		PSD.arrow.animate 
			properties:
				y: PSD.arrow.originY
			curve: springCurve
		PSD.timeline.animate
			properties:
				y: timelineStartY
			curve: springCurve