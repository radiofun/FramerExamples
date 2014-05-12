# Using basic events example
#
# In this example, you'll learn how to use basic events to 
# toggle a selection checkmark. Learn more about events in 
# Framer here: http://www.framerjs.com/lessons/index.html#events

# Set up the layers. There's a layer for the photo, and then a 
# layer for both the unchecked checkmark, and the checked 
# checkmark. checkmarkChecked is set to scale 0, since the 
# default state is unchecked.
photo = new Layer x:40, y:40, width:300, height:300, image:"images/photo.png"
checkmark = new Layer x:264, y:60, width:56, height:56, image:"images/checkmarkUnchecked.png"
checkmarkChecked = new Layer x:264, y:60, width:56, height:56, image:"images/checkmarkChecked.png"
checkmarkChecked.scale = 0


# We want the checkmark to scale down when the user initially
# clicks or touches to provide feedback 
checkmark.on Events.TouchStart, ->
	checkmark.animate
		properties:
			scale: .8
		curve: "spring(200,15,0)"
		
# When the click or touch ends, we want to swap the checkmark 
# and scale back up to 1. We set checkmarkChecked to the
# current scale of checkmark (this makes sure they're always
# in sync) and then immediately set the scale of checkmark
# to 0. We then call animateStop() on checkmark, in case the
# spring is still oscillating, then set checkmark's scale to 0
# and finally animate checkmarkChecked back to the proper scale.
checkmark.on Events.TouchEnd, ->
	checkmarkChecked.scale = checkmark.scale
	checkmark.animateStop()
	checkmark.scale = 0
	checkmarkChecked.animate
		properties:
			scale: 1
		curve: "spring(200,15,0)"
		
# We also want to be able to toggle the selection state of the
# checkmark, so we apply the same events with the opposite
# effects to checkmarkChecked
checkmarkChecked.on Events.TouchStart, ->
	checkmarkChecked.animate
		properties:
			scale: .8
		curve: "spring(200,15,0)"
		
checkmarkChecked.on Events.TouchEnd, ->
	checkmark.scale = checkmarkChecked.scale
	checkmarkChecked.animateStop()
	checkmarkChecked.scale = 0
	checkmark.animate
		properties:
			scale: 1
		curve: "spring(200,15,0)"
		