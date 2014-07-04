/* First, we'll set up a layer and some states */
var imageLayer;

imageLayer = new Layer({
  x: 0,
  y: 0,
  width: 128,
  height: 128,
  image: "images/Icon.png"
});

imageLayer.center();

imageLayer.states.add({
  second: {
    y: 100,
    scale: 0.6,
    rotationZ: 100
  },
  third: {
    y: 300,
    scale: 1.3,
    blur: 4
  },
  fourth: {
    y: 200,
    scale: 0.9,
    blur: 2,
    rotationZ: 200
  }
});

/* Next, we'll tell our document to listen for keystrokes */

document.addEventListener('keydown', function(event) {

  /* event.which gives us the charCode of the key that was pressed
  	For a list of keyCodes you can use, see: http://css-tricks.com/snippets/javascript/javascript-keycodes/
   */
  var key, keyCode;
  keyCode = event.which;

  /* We'll turn our keyCode to a readable character. The character will be uppercased */
  key = String.fromCharCode(keyCode);

  /* These are our keyboard shortcuts */
  switch (key) {
    case 'N':
      return imageLayer.states.next();
    case 'P':

      /* We can also check if special keys like Alt or Shift are pressed. 
      			So to toggle the previous state, you'll need to press Alt + P
       */
      if (event.altKey) {
        return imageLayer.states.previous();
      }
      break;
    case '1':
      return imageLayer.states["switch"]('default');
    case '2':
      return imageLayer.states["switch"]('second');
    case '3':
      return imageLayer.states["switch"]('third');
  }
});
