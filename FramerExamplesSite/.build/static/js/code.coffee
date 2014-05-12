getParameterByName = (name) ->
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
	regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
	results = regex.exec(location.search)
	(if not results? then "" else decodeURIComponent(results[1].replace(/\+/g, " ")))

$(document).ready ->

	exampleName = getParameterByName "name"

	$.ajax
		url: "/static/examples/#{exampleName}/app.js"
		dataType: "text",
		success: (data) ->
			Rainbow.color data, "javascript", (result) ->
				$("code").html result
