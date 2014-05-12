class GridView extends Layer
	
	constructor: (options={}) ->
		
		super options

		@rows = options.rows or 2
		@cols = options.cols or 2
		
		@layers = {}
		@update()
	
	update: ->
		for rowIndex in [1..@rows]
			for colIndex in [1..@cols]

				layer = @createLayer()

				frame =
					width: @width / @cols
					height: @height / @cols
				
				frame.x = (colIndex - 1) * frame.width
				frame.y = (rowIndex - 1) * frame.height
				
				layer.frame = frame
				@layers["#{rowIndex}.#{colIndex}"] = layer
				
				layer.superView = @
	
	createLayer: ->
		layer = new Layer
		layer.style.backgroundColor = Utils.randomColor(.5)
		layer.clip = false
		layer

gv = new GridView
	width:window.innerWidth
	height:window.innerHeight
	rows:3
	cols:3