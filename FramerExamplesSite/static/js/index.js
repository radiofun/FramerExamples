(function() {
  var showExample;

  showExample = function(exampleName) {
    $("#code").attr("src", "code.html?name=" + exampleName);
    return $("#example").attr("src", "example.html?name=" + exampleName);
  };

  $(document).ready(function() {
    var exampleName;
    exampleName = window.location.hash.slice(1);
    if (exampleName) {
      showExample(exampleName);
      $("a").each(function() {
        if ($(this).attr("href").slice(1) === exampleName) {
          return $(this).addClass("active");
        }
      });
    }
    return $("a").click(function() {
      $("a").removeClass("active");
      $(this).addClass("active");
      exampleName = $(this).attr("href").slice(1);
      return showExample(exampleName);
    });
  });

}).call(this);
