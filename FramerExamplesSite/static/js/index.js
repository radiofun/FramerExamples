(function() {
  $(document).ready(function() {
    var loadExample, loadExampleName, showExample;
    loadExample = function(loadExampleName) {
      if (typeof ga !== "undefined" && ga !== null) {
        ga("send", "pageview", "/examples/" + loadExampleName);
      }
      $("#code").attr("src", "code.html?name=" + loadExampleName);
      $("#example").attr("src", "example.html?name=" + loadExampleName);
      return $("a.download").attr("href", "/static/examples/" + loadExampleName + ".zip");
    };
    loadExampleName = window.location.hash.slice(1);
    loadExample(loadExampleName);
    showExample = function(exampleName) {
      if (typeof ga !== "undefined" && ga !== null) {
        ga("send", "pageview", "/examples/" + exampleName);
      }
      $("#code").attr("src", "code.html?name=" + exampleName);
      $("#example").attr("src", "example.html?name=" + exampleName);
      return $("a.download").attr("href", "/static/examples/" + exampleName + ".zip");
    };
    if (!window.location.hash.slice(1)) {
      window.location.hash = "animation-basics.framer";
      loadExample("animation-basics.framer");
    }
    $(".navigation ul li a").click(function() {
      var exampleName;
      exampleName = $(this).attr("href").slice(1);
      showExample(exampleName);
      $(".navigation ul li").removeClass("active");
      $(this).parent().addClass("active");
      $(".navigation").removeClass("appear");
      return $('#topbar').removeClass("active");
    });
    return $('#topbar img').click(function() {
      $(".navigation").toggleClass("appear");
      return $('#topbar').toggleClass("active");
    });
  });

}).call(this);
