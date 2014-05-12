showExample = (exampleName) ->
	$("#code").attr "src", "code.html?name=#{exampleName}"
	$("#example").attr "src", "example.html?name=#{exampleName}"	

$(document).ready ->
	
	exampleName = window.location.hash[1..]

	if exampleName
		showExample exampleName

		$("a").each ->
			if $(@).attr("href")[1..] == exampleName
				$(@).addClass "active"

	$("a").click ->

		$("a").removeClass "active"
		$(@).addClass "active"

		exampleName = $(@).attr("href")[1..]
		showExample exampleName


