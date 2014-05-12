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
    return $.getScript("/static/examples/" + exampleName + "/framer/framer.js", function() {
      $("head").append($("<base href=\"/static/examples/" + exampleName + "/\">"));
      return $.getScript("/static/examples/" + exampleName + "/app.js", function(err, data) {
        return console.log(data);
      });
    });
  });

}).call(this);
