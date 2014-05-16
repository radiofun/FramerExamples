showExample = (exampleName) ->
	$("#code").attr "src", "code.html?name=#{exampleName}"
	$("#example").attr "src", "example.html?name=#{exampleName}"
	$("a.download").attr "href", "/static/examples/#{exampleName}.zip"

$(document).ready ->
	
	exampleName = window.location.hash[1..]

	if exampleName
		showExample exampleName

		$(".navigation ul li a").each ->
			if $(@).attr("href")[1..] == exampleName
				$(@).addClass "active"

	$(".navigation ul li a").click ->

		$(".navigation ul li a").removeClass "active"
		$(@).addClass "active"

		exampleName = $(@).attr("href")[1..]
		showExample exampleName
		
		$(".navigation").removeClass "appear"
		$('#topbar').removeClass "active"


	$('#topbar img').click ->
	    $(".navigation").toggleClass "appear"
	    $('#topbar').toggleClass "active"
	    
	exampleFrame = $('#example').contents().find("#FramerRoot")

	$(".zoom-toggle").click (event) ->
		event.preventDefault()
		$(this).removeClass("inactive")	
		$(".zoom-toggle-two").removeClass("active")
		$(this).addClass("active")
		$(".zoom-toggle-two").addClass("inactive")
		exampleFrame.removeClass('half');
		$("#example").hide()
		
	$(".zoom-toggle-two").click (event) ->
		event.preventDefault()
		$(this).removeClass("inactive")
		$(this).addClass("active")
		$(".zoom-toggle").addClass("inactive")
		exampleFrame.addClass('half');
	
		