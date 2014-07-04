/* Text style set-up */
var curve1, layer1, layer2, layer3, textStyle;

textStyle = {
  "font-size": "17px",
  "text-align": "center",
  "line-height": "140px"
};

curve1 = "spring(300,20,50)";

/* Set up layers */

layer1 = new Layer({
  x: 50,
  y: 50,
  width: 140,
  height: 140,
  backgroundColor: "#0079c6",
  borderRadius: "6px"
});

layer2 = new Layer({
  x: 220,
  y: 50,
  width: 140,
  height: 140,
  backgroundColor: "#26b4f6",
  borderRadius: "6px"
});

layer3 = new Layer({
  x: 390,
  y: 50,
  width: 140,
  height: 140,
  backgroundColor: "#7ed6ff",
  borderRadius: "6px"
});

/* Add instruction text to layers, and style them */

layer1.html = "Hover";

layer2.html = "Click";

layer3.html = "MouseDown";

layer1.style = textStyle;

layer2.style = textStyle;

layer3.style = textStyle;

/* On mouse over on the blue layer, shrink it, and mouseout, grow back to original size. */

layer1.on(Events.MouseOver, function() {
  return layer1.animate({
    properties: {
      scale: 0.8
    },
    curve: curve1
  });
});

layer1.on(Events.MouseOut, function() {
  return layer1.animate({
    properties: {
      scale: 1
    },
    curve: curve1
  });
});

/* Scale to 1.2 on click, return to 1 after a 2s delay
Events.Click is triggered on mouseup, or touchend for touch devices */

layer2.on(Events.Click, function() {
  layer2.animate({
    properties: {
      scale: 1.2
    },
    curve: curve1
  });
  return Utils.delay(2, function() {
    return layer2.animate({
      properties: {
        scale: 1
      },
      curve: curve1
    });
  });
});

/* Shrink on MouseDown, Grow on MouseUp.
Events.TouchStart and Events.TouchEnd are used as they return both Mouse Events or Touch Events, depending on device. */

layer3.on(Events.TouchStart, function() {
  layer3.animate({
    properties: {
      scale: 0.8
    },
    curve: curve1
  });
  return layer3.html = "MouseUp";
});

layer3.on(Events.TouchEnd, function() {
  layer3.animate({
    properties: {
      scale: 1
    },
    curve: curve1
  });
  return layer3.html = "Mouse Down";
});
