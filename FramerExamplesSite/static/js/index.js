(function() {
  var showExample;

  showExample = function(exampleName) {
    $("#code").attr("src", "code.html?name=" + exampleName);
    $("#example").attr("src", "example.html?name=" + exampleName);
    return $("a.download").attr("href", "/static/examples/" + exampleName + ".zip");
  };

  $(document).ready(function() {
    var exampleFrame, exampleName;
    exampleName = window.location.hash.slice(1);
    if (exampleName) {
      showExample(exampleName);
      $(".navigation ul li a").each(function() {
        if ($(this).attr("href").slice(1) === exampleName) {
          return $(this).addClass("active");
        }
      });
    }
    $(".navigation ul li a").click(function() {
      $(".navigation ul li a").removeClass("active");
      $(this).addClass("active");
      exampleName = $(this).attr("href").slice(1);
      showExample(exampleName);
      $(".navigation").removeClass("appear");
      return $('#topbar').removeClass("active");
    });
    $('#topbar img').click(function() {
      $(".navigation").toggleClass("appear");
      return $('#topbar').toggleClass("active");
    });
    exampleFrame = $('#example').contents().find("#FramerRoot");
    $(".zoom-toggle").click(function(event) {
      event.preventDefault();
      $(this).removeClass("inactive");
      $(".zoom-toggle-two").removeClass("active");
      $(this).addClass("active");
      $(".zoom-toggle-two").addClass("inactive");
      exampleFrame.removeClass('half');
      return $("#example").hide();
    });
    return $(".zoom-toggle-two").click(function(event) {
      event.preventDefault();
      $(this).removeClass("inactive");
      $(this).addClass("active");
      $(".zoom-toggle").addClass("inactive");
      return exampleFrame.addClass('half');
    });
  });

}).call(this);
