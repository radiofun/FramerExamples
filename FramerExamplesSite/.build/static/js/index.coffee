$(document).ready ->
	
	$("a").click ->
		
		exampleName = $(@).attr("href")[1..]

		$("#code").attr "src", "code.html?name=#{exampleName}"
		$("#example").attr "src", "example.html?name=#{exampleName}"
