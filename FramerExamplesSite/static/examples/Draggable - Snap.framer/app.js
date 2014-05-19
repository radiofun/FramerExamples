layerA = new Layer({
  width: 256,
  height: 256
});

layerA.center();
originX = layerA.x;
originY = layerA.y;

layerA.image = "https://pbs.twimg.com/profile_images/442744361017540608/NCEct4yy.jpeg";

layerA.style = {
  borderRadius: '50%',
  boxShadow: 'inset 0 0 0 8px #fff, 0 4px 12px rgba(0,0,0,0.4)'
};

layerA.draggable.enabled = true;

layerA.on(Events.DragEnd, function(event, layer) {
  var animation;

  return animation = layer.animate({
    properties: {
      x: originX,
      y: originY
    },
    curve: "spring",
    curveOptions: {
      friction: 20,
      tension: 400,
      velocity: 20
    }
  });
});
