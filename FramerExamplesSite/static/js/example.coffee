getParameterByName = (name) ->
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
	regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
	results = regex.exec(location.search)
	(if not results? then "" else decodeURIComponent(results[1].replace(/\+/g, " ")))

$(document).ready ->

	exampleName = getParameterByName "name"

	# Set the base dir so images load
	$("head").append $("<base href=\"/static/examples/#{exampleName}/\">")

	# Load the framer associated with this example
	$.getScript "framer/framer.js", (data) ->
		# throw err if err
		$.getScript "app.js", (data) ->
			# throw err if err