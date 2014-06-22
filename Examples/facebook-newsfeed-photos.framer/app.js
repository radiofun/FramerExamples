/*  Facebook photo album example for Framer */

/*  Cemre Gungor - 2014 */

/* Import the generator sketch assets */
var animating, importedLayers, setup, unzoomPhoto, zoomPhoto;

importedLayers = Framer.Importer.load("imported/feed");

/* Use the Framer library https://github.com/facebook/shortcuts-for-framer */

Utils.domLoadScriptSync("framer/library.js");

Framer.Shortcuts.initialize(importedLayers);

Framer.Defaults.Animation.curve = "spring(800,45,0)";

/* We don"t want the lightbox to capture clicks. */

Lightbox.visible = true;

Lightbox.opacity = 0;

Lightbox.style.pointerEvents = "none";

/* Limit the width of the collage
(Because the masked photos extend beyond the screen) */

PhotoGrid.width = 640;

/* Helps us make sure we don"t try to run multiple animations at once */

animating = false;

/* HELPING FUNCTIONS */

setup = function(grid) {

  /* Grab the unmasked image inside the box */
  grid.imageLayer = grid.getChild("Image");

  /* Remember where the grid box and image were originally sitting relative to their parents */
  grid.feedFrame = grid.frame;
  grid.imageLayer.feedFrame = grid.imageLayer.frame;

  /* We"ll scale the image so it fits the screen horizontally */
  grid.imageRatio = grid.imageLayer.width / grid.imageLayer.height;

  /* Height of the container when we fill the screen with the photo */
  grid.finalHeight = Phone.width / grid.imageRatio;
  grid.states.add("default", {
    x: grid.x,
    y: grid.y,
    width: grid.width,
    height: grid.height
  });
  grid.states.add("above", {
    x: grid.screenFrame().x,
    y: grid.screenFrame().y,
    width: grid.width,
    height: grid.height
  });
  grid.states.add("zoomed", {
    x: 0,
    y: (Phone.height - grid.finalHeight) / 2,
    width: 640,
    height: grid.finalHeight
  });
  grid.imageLayer.states.add("default", {
    x: grid.imageLayer.x,
    y: grid.imageLayer.y,
    width: grid.imageLayer.width,
    height: grid.imageLayer.height
  });
  grid.imageLayer.states.add("zoomed", {
    x: 0,
    y: 0,
    width: 640,
    height: grid.finalHeight
  });
  grid.states.animationOptions = Framer.Defaults.Animation;
  grid.imageLayer.states.animationOptions = Framer.Defaults.Animation;
  return grid.states.on(Events.StateDidSwitch, function(previous, current) {
    animating = false;
    if (current === "zoomed" && previous === "above") {

      /* Enable drag so I can pull to close */
      grid.draggable.enabled = true;
    }
    if (current === "above" && previous === "zoomed") {

      /* Put the grid back in the collage group after animating
      (so we can scroll it)
       */
      grid.states.switchInstant("default");
      return grid.superLayer = PhotoGrid;
    }
  });
};

/* Zoom in a photo full-screen from the feed */

zoomPhoto = function(grid) {
  if (animating) {
    return;
  }
  animating = true;

  /* Remember where the photo was originally sitting relative to the corner of the screen (This is different than where it sits relative to its parent - the top of the feed) */
  grid.states._states.above.x = grid.screenFrame().x;
  grid.states._states.above.y = grid.screenFrame().y;

  /* Take it out of the from the scrolling feed and put it above other layers */
  grid.superLayer = Phone;
  grid.bringToFront();

  /* Position it to where it was sitting */
  grid.states.switchInstant("above");
  return Utils.delay(0.01, function() {

    /* Fade in the lightbox */
    Lightbox.fadeIn();
    grid.states["switch"]("zoomed");
    return grid.imageLayer.states["switch"]("zoomed");
  });
};

/* Zoom out a photo from full-screen into the feed */

unzoomPhoto = function(grid) {
  if (animating) {
    return;
  }
  animating = true;
  Lightbox.fadeOut();
  grid.draggable.enabled = false;
  grid.imageLayer = grid.getChild("Image");

  /* Animate back to where they were */
  grid.imageLayer.states["switch"]("default");
  return grid.states["switch"]("above");
};

/* SET UP THE BEHAVIORS */

/* Make the feed scrollable */

FeedScroll.scrollVertical = true;

/* This will assign the same functionality to all the photos in the grid. That"s why we"re doing it in a loop. */

PhotoGrid.subLayers.forEach(function(grid) {

  /* We add this with CSS so it stays as we scale the grid */
  grid.style.boxShadow = "0 1px 4px rgba(0,0,0,0.5)";

  /* Remember some positions */
  setup(grid);
  grid.on(Events.Click, function() {
    if (grid.width === 640) {

      /* If already zoomed, unzoom */
      return unzoomPhoto(grid);
    } else {
      return zoomPhoto(grid);
    }
  });

  /* Configure the drag-to-close, but we"ll enable this later (in the zoomPhoto function) */
  grid.draggable.speedX = 0;
  grid.draggable.enabled = false;

  /* What happens as I drag */
  grid.on(Events.DragMove, function() {

    /* the delta tells us how far we dragged the image */
    var lastDelta, yDelta;
    lastDelta = _.last(grid.draggable._deltas);
    if (lastDelta) {
      yDelta = Math.abs(lastDelta.y);
      return Lightbox.opacity = Framer.Shortcuts.convertRange(200, 0, yDelta, 0.2, 1, true);
    }
  });

  /* What happens when I let go */
  return grid.on(Events.DragEnd, function() {

    /* Make sure we only do this if I actually dragged it (DragEnd will fire on regular clicks too) */
    var lastDelta;
    lastDelta = _.last(grid.draggable._deltas);
    if (lastDelta && lastDelta.y > 10) {
      return unzoomPhoto(grid);
    }
  });
});
