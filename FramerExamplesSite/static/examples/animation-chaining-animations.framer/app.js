/* Setup */
var notification;

notification = new Layer({
  x: 0,
  y: 0,
  width: 200,
  height: 120,
  scale: 0,
  borderRadius: "8px",
  backgroundColor: "#28acff"
});

notification.html = 'Click Me';

notification.style = {
  fontSize: '30px',
  textAlign: 'center',
  lineHeight: '125px'
};

notification.center();

notification.animate({
  properties: {
    scale: 1
  },
  curve: 'spring',
  curveOptions: {
    friction: 20
  }
});

notification.on(Events.Click, function() {

  /* Setting the hinge to the top left */
  var hingeAnimation;
  notification.originX = 0;
  notification.originY = 0;

  /* Assigning the result of the animation to a variable called hingeAnimation */
  hingeAnimation = notification.animate({
    properties: {
      rotationZ: 45
    },
    curve: 'spring',
    curveOptions: {
      tension: 900,
      friction: 25,
      velocity: 30
    }
  });

  /* When the first animation ends, we'll drop the layer out of view */
  return hingeAnimation.on('end', function() {
    return notification.animate({
      properties: {
        y: 2000
      },
      curve: 'cubic-bezier',
      time: 1
    });
  });
});
