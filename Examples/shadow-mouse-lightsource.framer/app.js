var bg, layer;

bg = new BackgroundLayer({
  backgroundColor: "rgba(77, 208, 225, 1.00)"
});

layer = new Layer({
  backgroundColor: "white"
});

layer.center();

window.onmousemove = function(event) {
  var alpha, delta, dist;
  delta = {
    x: layer.midX - event.clientX,
    y: layer.midY - event.clientY
  };
  dist = Math.abs(delta.x) + Math.abs(delta.y);
  alpha = Utils.modulate(dist, [0, 150], [0, .4], true);
  layer.shadowX = Utils.modulate(delta.x, [0, Screen.width / 2], [0, 50]);
  layer.shadowY = Utils.modulate(delta.y, [0, Screen.height / 2], [0, 50]);
  layer.shadowBlur = Utils.modulate(dist, [0, 100], [5, 10]);
  return layer.shadowColor = "rgba(0,0,0," + alpha + ")";
};
