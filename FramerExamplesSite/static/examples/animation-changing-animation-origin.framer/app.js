var layerA;

layerA = new Layer({
  x: 25,
  y: 25,
  width: 128,
  height: 128,
  backgroundColor: '#28acff',
  borderRadius: "6px"
});

/* This defines the distance from the viewer to the elements in the view and enhances 3D effects */

document.body.style.webkitPerspective = 1000;

/* Setting transform origin to the right edge. Both values go from 0 to 1, so 1, 1 will be the bottom right corner. By default, the origin is set to (0.5, 0.5) */

layerA.originX = 1;

layerA.originY = 0.5;

layerA.on(Events.Click, function() {
  return layerA.animate({
    properties: {
      rotationY: 180
    },
    curve: 'spring',
    curveOptions: {
      friction: 100
    }
  });
});
