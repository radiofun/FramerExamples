(function() {
  $(document).ready(function() {
    return $("a").click(function() {
      var exampleName;
      exampleName = $(this).attr("href").slice(1);
      $("#code").attr("src", "code.html?name=" + exampleName);
      return $("#example").attr("src", "example.html?name=" + exampleName);
    });
  });

}).call(this);
