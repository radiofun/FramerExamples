var Background, Container, Field, colNumber, _i;

Background = new BackgroundLayer({
  backgroundColor: "#f6f6f6"
});

/* Placing all fields within a container */

Container = new Layer({
  backgroundColor: "transparent",
  width: 400,
  height: 400
});

Container.center();

Container.style.padding = "10px 0 0 0 ";

/* 3 Fields */

for (colNumber = _i = 0; _i < 3; colNumber = ++_i) {
  Field = new Layer({
    width: 360,
    height: 100,
    backgroundColor: "#fff",
    shadowY: 2,
    shadowBlur: 5,
    borderRadius: "6px",
    y: colNumber * 120
  });
  Field.shadowColor = "rgba(0, 0, 0, 0.25)";
  Field.superLayer = Container;
  Field.centerX();

  /* Each field gets its own Highlight and Shadow animation */
  Field.on(Events.Click, function(event, Field) {
    var Highlight, fieldAnimation, highlightAnimation;
    Highlight = new Layer({
      width: 10,
      height: 10,
      backgroundColor: "#eeeeee",
      borderRadius: "50%",
      opacity: 0
    });
    Highlight.superLayer = Field;
    Highlight._prefer2d = true;

    /* Matching the Highlight position with the click position */
    Highlight.x = event.clientX - Container.x - Field.x - (Highlight.width / 2);
    Highlight.y = event.clientY - Container.y - Field.y - (Highlight.height / 2);

    /* Grow Highlight */
    highlightAnimation = Highlight.animate({
      properties: {
        width: Field.width + 20,
        height: 400,
        opacity: 1,
        x: -10,
        y: -161
      },
      curve: "ease",
      time: 0.25
    });

    /* Fade & Reset Highlight */
    highlightAnimation.on("end", function() {
      Highlight.animate({
        properties: {
          opacity: 0
        },
        curve: "ease",
        time: 0.1
      });
      return utils.delay(0.1, function() {

        /* Resetting the Highlight properties */
        Highlight.width = 80;
        return Highlight.height = 80;
      });
    });

    /* Animate Shadow */
    fieldAnimation = Field.animate({
      properties: {
        shadowY: 10,
        shadowBlur: 16
      },
      curve: "ease",
      time: 0.4
    });

    /* Reset Shadow */
    return fieldAnimation.on("end", function() {
      return Field.animate({
        properties: {
          shadowY: 2,
          shadowBlur: 5
        },
        curve: "ease",
        time: 0.4
      });
    });
  });
}
