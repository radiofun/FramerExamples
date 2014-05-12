var GridView, gv,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GridView = (function(_super) {
  __extends(GridView, _super);

  function GridView(options) {
    if (options == null) {
      options = {};
    }
    GridView.__super__.constructor.call(this, options);
    this.rows = options.rows || 2;
    this.cols = options.cols || 2;
    this.layers = {};
    this.update();
  }

  GridView.prototype.update = function() {
    var colIndex, frame, layer, rowIndex, _i, _ref, _results;
    _results = [];
    for (rowIndex = _i = 1, _ref = this.rows; 1 <= _ref ? _i <= _ref : _i >= _ref; rowIndex = 1 <= _ref ? ++_i : --_i) {
      _results.push((function() {
        var _j, _ref1, _results1;
        _results1 = [];
        for (colIndex = _j = 1, _ref1 = this.cols; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; colIndex = 1 <= _ref1 ? ++_j : --_j) {
          layer = this.createLayer();
          frame = {
            width: this.width / this.cols,
            height: this.height / this.cols
          };
          frame.x = (colIndex - 1) * frame.width;
          frame.y = (rowIndex - 1) * frame.height;
          layer.frame = frame;
          this.layers["" + rowIndex + "." + colIndex] = layer;
          _results1.push(layer.superView = this);
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  GridView.prototype.createLayer = function() {
    var layer;
    layer = new Layer;
    layer.style.backgroundColor = Utils.randomColor(.5);
    layer.clip = false;
    return layer;
  };

  return GridView;

})(Layer);

gv = new GridView({
  width: window.innerWidth,
  height: window.innerHeight,
  rows: 3,
  cols: 3
});
