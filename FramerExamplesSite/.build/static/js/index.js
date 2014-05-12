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
    }
    return $("a").click(function() {
      exampleName = $(this).attr("href").slice(1);
      return showExample(exampleName);
    });
  });

}).call(this);
