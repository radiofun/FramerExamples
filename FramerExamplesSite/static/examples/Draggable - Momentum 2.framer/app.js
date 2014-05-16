layerA = new Layer({
  width: 256,
  height: 256
});

layerA.center();

layerA.image = "https://pbs.twimg.com/profile_images/442744361017540608/NCEct4yy.jpeg";

layerA.style = {
  borderRadius: '50%',
  boxShadow: 'inset 0 0 0 10px #fff, 0 4px 12px rgba(0,0,0,0.4)'
};

layerA.draggable.enabled = true;

layerA.on(Events.DragEnd, function(event, layer) {
  var animation, constant1, constant2, totalVelocity, velocity;
  constant1 = 1000;
  constant2 = 0;
  velocity = layer.draggable.calculateVelocity();
  totalVelocity = Utils.pointTotal(Utils.pointAbs(velocity));
  return animation = layer.animate({
    properties: {
      x: parseInt(layer.x + (velocity.x * constant1)),
      y: parseInt(layer.y + (velocity.y * constant1))
    },
    curve: "spring",
    curveOptions: {
      friction: 100,
      tension: 80,
      velocity: totalVelocity * constant2
    }
  });
});
