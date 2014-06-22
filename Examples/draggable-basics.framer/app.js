/* Draggable Basics */

/* This example will show you the basics of draggable, a handy function that makes any layer draggable! This is super handy for drag and drop and there are many other things you can do as well. To read more 
about draggable, go here: [link to draggable part of the site] */

/* Set up some labels, and our drop target */
var PSD, dropTarget, initMidX, initX, initY, joshLabel, kayleighLabel, keegLabel, sharedStyle, windowHeight, windowWidth;

sharedStyle = {
  "font-size": "18px",
  "text-align": "center",
  "padding-top": "50px",
  "line-height": "24px"
};

joshLabel = new Layer({
  x: 26,
  y: 130,
  width: 156,
  height: 156,
  backgroundColor: "none"
});

joshLabel.html = "Draggable";

joshLabel.style = sharedStyle;

kayleighLabel = new Layer({
  x: 274,
  y: 130,
  width: 156,
  height: 156,
  backgroundColor: "none"
});

kayleighLabel.html = "Draggable with resistance";

kayleighLabel.style = sharedStyle;

keegLabel = new Layer({
  x: 518,
  y: 130,
  width: 156,
  height: 156,
  backgroundColor: "none"
});

keegLabel.html = "Draggable with dynamic resistance";

keegLabel.style = sharedStyle;

dropTarget = new Layer({
  x: 26,
  y: 500,
  width: 156,
  height: 156,
  backgroundColor: "teal"
});

dropTarget.html = "Drop the bobble above in me!";

dropTarget.style = sharedStyle;

PSD = Framer.Importer.load("imported/bobbles");

/* The first shows bobble the default behavior when you make a layer draggable, and also how to implement a drop target. */

/* Make the view draggable. By default, this means when you click and drag (or tap and move), the layer will follow your cursor/finger. When you release, the layer stays where you last left it. All with one line of code! */

PSD.bobbleJosh.draggable.enabled = true;

/* When you drop the first bobble, we calculate the distance from its center to the center of the drop target. If the  distance is less than 16 (which means the bobble is fully inside the drop target), then the color of the drop  target changes to green. If it's outside the target, the color stays teal. */

PSD.bobbleJosh.on(Events.DragEnd, function() {
  var dX, dY;
  dX = Math.abs(dropTarget.midX - PSD.bobbleJosh.midX);
  dY = Math.abs(dropTarget.midY - PSD.bobbleJosh.midY);
  if (dX < 16 && dY < 16) {
    return dropTarget.backgroundColor = "green";
  } else {
    return dropTarget.backgroundColor = "teal";
  }
});

/* The second bobble shows how to add resistance to a layer that is draggable. This means that instead of a 1 to 1 mapping to your cursor/finger when you drag, the layer moves some fraction (defined as speed) of the distance you have moved. You can set this on both X and Y, and the values can be different. */

PSD.bobbleKayleigh.draggable.enabled = true;

PSD.bobbleKayleigh.draggable.speedX = 0.6;

PSD.bobbleKayleigh.draggable.speedY = 0.6;

/* The final example shows how to add dynamic resistance to a layer. This is a bit more advanced, but still not too bad. */

/* Make the layer draggable, and set some initial vars that we'll use later (like the position of the layer, the window width and height). */

PSD.bobbleKeeg.draggable.enabled = true;

initX = PSD.bobbleKeeg.x;

initMidX = PSD.bobbleKeeg.midX;

initY = PSD.bobbleKeeg.y;

windowHeight = window.innerHeight;

windowWidth = window.innerHeight;

/* When the layer is being dragged, we change the speed (resistance) dynamically, based on how far away the cursor is from the starting point of the layer. */

PSD.bobbleKeeg.on(Events.DragMove, function(event) {

  /* Grab the delta for x distance (We do this for X and not for Y because the bobble is horizontally in the middle of the screen, so delta can be positive or negative */
  var deltaX, speedX, speedY;
  deltaX = initMidX - event.x;

  /* Since the Y drag can basically only go in one direction, we can immediately map the range. This handy function takes the current y position and maps that from the initial Y to the maximum Y, in this case the window height to a 0.5 to 1 range. This means that the further away from the layer's initial position the drag is, the more resistance we add, such that if you drag all the way to the bottom of the view, the layer will eventually be unable to go further. */
  speedY = Utils.mapRange(event.y, windowHeight, initY, 0.5, 1);

  /* Since you can drag left or right, we need to map the range correctly. If deltaX is positive, we map from the start of the view to the mid point of the layer (everything left of the layer). If the deltaX is negative, we map from the mid point of the layer to the edge of the screen (everything right of the layer). */
  if (deltaX > 0) {
    speedX = Utils.mapRange(event.x, 0, initMidX, 0.5, 1);
  } else {
    speedX = Utils.mapRange(event.x, windowWidth, initMidX, 0.5, 1);
  }

  /* Set the speeds */
  PSD.bobbleKeeg.draggable.speedY = speedY;
  return PSD.bobbleKeeg.draggable.speedX = speedX;
});

/* When the drag is finished, snap back to initial position */

PSD.bobbleKeeg.on(Events.DragEnd, function() {
  return PSD.bobbleKeeg.animate({
    properties: {
      x: initX,
      y: initY
    },
    curve: "spring(300,18,10)"
  });
});
