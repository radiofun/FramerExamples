

showExample = (exampleName) ->

	ga "send", "pageview", "/examples/#{exampleName}"

	$("#code").attr "src", "code.html?name=#{exampleName}"
	$("#example").attr "src", "example.html?name=#{exampleName}"
	$("a.download").attr "href", "/static/examples/#{exampleName}.zip"

	
$(document).ready ->
	
	exampleName = window.location.hash[1..]

	if not exampleName
		window.location.hash = exampleName = "carousel-onboarding.framer"

	showExample exampleName

	$(".navigation ul li a").each ->
		if $(@).attr("href")[1..] == exampleName
			$(@).addClass "active"

	$(".navigation ul li a").click ->

		$(".navigation ul li").removeClass "active"
		$(@).parent().addClass "active"

		exampleName = $(@).attr("href")[1..]
		showExample exampleName
		
		$(".navigation").removeClass "appear"
		$('#topbar').removeClass "active"


	$('#topbar img').click ->
	    $(".navigation").toggleClass "appear"
	    $('#topbar').toggleClass "active"
		    
		


	
	

