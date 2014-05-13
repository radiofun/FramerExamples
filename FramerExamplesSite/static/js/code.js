(function() {
  var getParameterByName;

  getParameterByName = function(name) {
    var regex, results;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    results = regex.exec(location.search);
    if (results == null) {
      return "";
    } else {
      return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  };

  $(document).ready(function() {
    var exampleName;
    exampleName = getParameterByName("name");
    $.ajax({
      url: "/static/examples/" + exampleName + "/app.js",
      dataType: "text",
      success: function(data) {
        return Rainbow.color(data, "javascript", function(result) {
          return $("code").html(result);
        });
      }
    });
    $(".toggle").click(function() {
      $(this).toggleClass("active-toggle");
      return $("#dropdown").toggleClass("active");
    });
    return $(".learn").click(function() {
      $("#explain").toggleClass("active");
      return $("pre").toggleClass("bump");
    });
  });

}).call(this);
