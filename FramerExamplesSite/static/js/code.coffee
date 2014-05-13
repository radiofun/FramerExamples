getParameterByName = (name) ->
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
	regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
	results = regex.exec(location.search)
	(if not results? then "" else decodeURIComponent(results[1].replace(/\+/g, " ")))

_current = null

loadCS = (exampleName) ->

	_current = "cs"

	$(".learn").show()

	$(".toggle").html "CoffeeScript"
	$("#dropdown a").html "JavaScript"

	$.ajax
		url: "/static/examples/#{exampleName}/app.coffee"
		dataType: "text",
		success: (data) ->
			Rainbow.color data, "coffeescript", (result) ->
				$("code").html result.replace /\t/g, "  "

loadJS = (exampleName) ->

	_current = "js"

	$(".learn").hide()

	$(".toggle").html "JavaScript"
	$("#dropdown a").html "CoffeeScript"

	$.ajax
		url: "/static/examples/#{exampleName}/app.js"
		dataType: "text",
		success: (data) ->
			Rainbow.color data, "javascript", (result) ->
				$("code").html result

$(document).ready ->

	exampleName = getParameterByName "name"

	loadCS exampleName

	
	$(".toggle").click ->	
		$(this).toggleClass("active-toggle")
		$("#dropdown").toggleClass("active")
		
	$(".learn").click ->	
		$(this).toggleClass("active")
		$("#explain").toggleClass("active")	
		$("pre").toggleClass("bump")

	$("#dropdown").click ->

		if _current is "cs"
			loadJS exampleName
		else
			loadCS exampleName

		$(".toggle").toggleClass("active-toggle")
		$("#dropdown").toggleClass("active")


		console.log "hello"