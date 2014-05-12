showExample = (exampleName) ->
	$("#code").attr "src", "code.html?name=#{exampleName}"
	$("#example").attr "src", "example.html?name=#{exampleName}"	

$(document).ready ->
	
	exampleName = window.location.hash[1..]

	if exampleName
		showExample exampleName

	$("a").click ->
		exampleName = $(@).attr("href")[1..]
		showExample exampleName


