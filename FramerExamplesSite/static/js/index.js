(function() {
  var checkCode, log, showExample;

  log = console.log;

  showExample = function(exampleName) {
    $("#code").attr("src", "code.html?name=" + exampleName);
    $("#example").attr("src", "example.html?name=" + exampleName);
    return $("a.download").attr("href", "/static/examples/" + exampleName + ".zip");
  };

  checkCode = function() {
    var codeHTML;
    codeHTML = $("#code").contents().find("html");
    if (codeHTML.hasClass('half')) {
      return $('#example').addClass('half');
    }
  };

  $(document).ready(function() {
    var exampleName;
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
    return $('#topbar img').click(function() {
      $(".navigation").toggleClass("appear");
      return $('#topbar').toggleClass("active");
    });
  });

  $(window).load(function() {
    $(".zoom-toggle").click(function(event) {
      event.preventDefault();
      $(this).removeClass("inactive");
      $(".zoom-toggle-two").removeClass("active");
      $(this).addClass("active");
      $(".zoom-toggle-two").addClass("inactive");
      $(':root').removeClass("half");
      return window.parent.postMessage("apenkop", "*");
    });
    return $(".zoom-toggle-two").click(function(event) {
      event.preventDefault();
      $(this).removeClass("inactive");
      $(this).addClass("active");
      $(".zoom-toggle").addClass("inactive");
      return $(":root").addClass("half");
    });
  });

}).call(this);
