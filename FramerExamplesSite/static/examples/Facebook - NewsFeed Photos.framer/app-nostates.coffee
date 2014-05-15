importedLayers = Framer.Importer.load("imported/Feed")
Framer.Shortcuts.initialize importedLayers

#  Facebook photo album example for Framer
#
#  Cemre Gungor - 2014
Framer.Defaults.Animation.curve = "spring(400,30,0)"
Lightbox = Layers.Lightbox
PhotoGrid = Layers.PhotoGrid

# We don't want the lightbox to capture clicks.
Lightbox.visible = true
Lightbox.opacity = 0
Lightbox.style.pointerEvents = "none"

# Limit the width of the collage
# (Because the masked photos extend beyond the screen)
PhotoGrid.width = 640

# Helps us make sure we don't try to run multiple animations at once
animating = false



###############################################
# HELPING FUNCTIONS

setup = (grid) ->
  
  # Grab the unmasked image inside the box
  grid.imageLayer = grid.getChild("Image")
  
  # Remember where the grid box and image were
  # originally sitting relative to their parents
  grid.feedFrame = grid.frame
  grid.imageLayer.feedFrame = grid.imageLayer.frame


  # We'll scale the image so it fits the screen horizontally
  grid.imageRatio = grid.imageLayer.width / grid.imageLayer.height
  
  # Height of the container when we fill the screen with the photo
  grid.finalHeight = Phone.width / grid.imageRatio




# Zoom in a photo full-screen from the feed
zoomPhoto = (grid) ->
  return if animating
  animating = true
  
  # Remember where the photo was originally sitting 
  # relative to the corner of the screen (This is different than
  # where it sits relative to its parent - the top of the feed)
  grid.feedScreenFrame = grid.screenFrame()
  
  
  # Take it out of the from the scrolling feed and
  # put it above other layers
  grid.superLayer = Phone
  grid.bringToFront()
  
  # Position it to where it was sitting
  grid.frame = grid.feedScreenFrame
  
  # Fade in the lightbox
  Lightbox.fadeIn()
  
  # Animate the container to the center of the screen
  grid.animateTo
    x: 0
    y: (Phone.height - grid.finalHeight) / 2
    width: 640
    height: grid.finalHeight
  , ->
    animating = false

    # Enable drag so I can pull to close
    grid.draggable.enabled = true

  # Animate the image to fill the grid
  grid.imageLayer.animateTo
    x: 0
    y: 0
    width: 640
    height: grid.finalHeight

  




# Zoom out a photo from full-screen into the feed
unzoomPhoto = (grid) ->
  return if animating
  animating = true

  Lightbox.fadeOut()
  grid.draggable.enabled = false
  grid.imageLayer = grid.getChild("Image")
  
  # Animate back to where they were
  grid.imageLayer.animateTo
    x: grid.imageLayer.feedFrame.x
    y: grid.imageLayer.feedFrame.y
    width: grid.imageLayer.feedFrame.width
    height: grid.imageLayer.feedFrame.height

  grid.animateTo
    x: grid.feedScreenFrame.x
    y: grid.feedScreenFrame.y
    width: grid.feedScreenFrame.width
    height: grid.feedScreenFrame.height
  , ->
    
    # Put the grid back in the collage group after animating
    # (so we can scroll it)
    grid.superLayer = PhotoGrid
    grid.frame = grid.feedFrame
    animating = false





###############################################
# SET UP THE BEHAVIORS


# This will assign the same functionality to all the 
# photos in the grid. That's why we're doing it in a loop.
PhotoGrid.subLayers.forEach (grid) ->
  
  # We add this with CSS so it stays as we scale the grid
  grid.style.boxShadow = "0 1px 4px rgba(0,0,0,0.5)"
  
  # Remember some positions
  setup grid
  grid.on Events.Click, ->
    if grid.width is 640
      # If already zoomed, unzoom
      unzoomPhoto grid
    else
      zoomPhoto grid

  
  # Configure the drag-to-close
  # But we'll enable this later (in the zoomPhoto function)
  grid.draggable.speed.x = 0
  grid.draggable.enabled = false

  # What happens as I drag
  grid.on Events.DragMove, ->
    # the delta tells us how far we dragged the image
    lastDelta = _.last(grid.draggable._deltas)
    if lastDelta
      yDelta = Math.abs(lastDelta.y)
      Lightbox.opacity = Framer.Shortcuts.convertRange(200, 0, yDelta, 0.2, 1, true)

  # What happens when I let go
  grid.on Events.DragEnd, ->
    
    # Make sure we only do this if I actually dragged it
    # (DragEnd will fire on regular clicks too)
    lastDelta = _.last(grid.draggable._deltas)
    unzoomPhoto grid  if lastDelta and lastDelta.y > 10
