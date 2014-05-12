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
    return $.ajax({
      url: "/static/examples/" + exampleName + "/app.js",
      dataType: "text",
      success: function(data) {
        return $("pre").html(data);
      }
    });
  });

}).call(this);
