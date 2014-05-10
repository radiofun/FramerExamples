# Changing layer properties

# A new layer gets a set of default properties, a width and 
# height of 100 and a blue color. You can change these, see
# the example Framer Defaults.

layerA = new Layer

# A layer has a whole set of properties like width, height,
# backgroundColor, opacity etc. You can find them all in the
# documentation here: http://www.framerjs.com

# You can set any of them on creation like this
layerB = new Layer width:50, height:50, x:0, y:150, backgroundColor:"red"

# You can also set them at any time afterwards
layerC = new Layer width:50, height:50, x:0, y:250, backgroundColor:"green"
layerC.rotation = 20

# Here are some more properties to play with
layerC = new Layer width:100, height:100, x:110, y:350, backgroundColor:"orange"

layerC.scale = 1.2
layerC.opacity = 0.5
layerC.rotationX = 10
layerC.rotationY = 30
layerC.originX = 0.2