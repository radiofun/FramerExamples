/* Imported 2 images from Sketch */
var Numbers, bottomScreen, bottomScreenCurve, screens, topScreen;

screens = Framer.Importer.load("imported/Swipe");

topScreen = screens.firstScreen;

bottomScreen = screens.secondScreen;

bottomScreenCurve = "spring(300,20,30)";

/* Enable dragging */

topScreen.draggable.enabled = true;

topScreen.draggable.speedY = 0;

/* Prevent dragging left */

topScreen.draggable.maxDragFrame = topScreen.frame;

topScreen.draggable.maxDragFrame.width *= 2;

Numbers = new Layer({
  backgroundColor: "transparent",
  width: 640,
  y: 180
});

Numbers.clip = false;

Numbers.html = "Swipe";

Numbers.superLayer = screens.bg;

/* Animate bottomScreen and track dragging distance */

topScreen.on(Events.DragMove, function() {
  if (topScreen.x > 0) {
    Numbers.html = event.x;
  }
  return bottomScreen.animate({
    properties: {
      scale: 0.1 + (event.x / 640),
      opacity: event.x / 640
    },
    curve: bottomScreenCurve
  });
});

/* If dragged beyond half of screen, swipe */

topScreen.on(Events.DragEnd, function() {
  if (topScreen.x > (this.width / 2)) {
    topScreen.animate({
      properties: {
        x: 650
      },
      curve: "ease",
      time: 0.15
    });
  } else {
    topScreen.animate({
      properties: {
        x: 0
      },
      curve: "spring(500,40,20)"
    });
    Numbers.html = "Swipe";
  }
  return bottomScreen.animate({
    properties: {
      scale: 1,
      opacity: 1
    },
    curve: bottomScreenCurve
  });
});
