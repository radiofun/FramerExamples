/* Basic state machine. A state machine is a simple way to organize animation code. The idea is that you define a set of states, which are a collection of properties with values, by name. From then on you can animate to any state. */
var layerA, layerB, layerC;

layerA = new Layer({
  width: 50,
  height: 50,
  backgroundColor: "red"
});

/* This is how you define states. There is always an initial state that is called 'default' and has the initial properties. */

layerA.states.add({
  stateA: {
    y: 100,
    rotation: 180
  },
  stateB: {
    y: 150,
    rotation: 60
  }
});

/* So now layerA had three states default, stateA and stateB. Let's switch to some state on a click. */

layerA.on(Events.Click, function() {
  return layerA.states["switch"]("stateA");
});

/* That is cool but it now just switches to stateA on every click so it's just stuck there. Normally you would want to toggle or cycle through states. That is where the .next() function comes in. */

/* Let's set up another layer that cycles through states. */

layerB = new Layer({
  width: 50,
  height: 50,
  y: 200,
  backgroundColor: "orange"
});

layerB.states.add({
  stateA: {
    y: 200,
    rotation: 180
  },
  stateB: {
    y: 100,
    rotation: 60
  },
  stateC: {
    x: 40,
    rotation: 0,
    blur: 10
  }
});

/* Remember about that default state. So there are 4 now in total */

layerB.on(Events.Click, function() {

  /* Notice the next function here below */
  return layerB.states.next();
});

/* That is a lot cooler. Now often, you want to determine the order of the states that it cycles through. The .next() function takes a list of state names. */

layerC = new Layer({
  width: 50,
  height: 50,
  y: 400,
  backgroundColor: "blue"
});

layerC.states.add({
  stateA: {
    y: 200,
    rotation: 180
  },
  stateB: {
    y: 300,
    x: 40,
    rotation: 60
  },
  stateC: {
    y: 400,
    x: 40,
    rotation: 0
  }
});

layerC.on(Events.Click, function() {

  /* Now it will just cycle through states stateC and stateB */
  return layerC.states.next("stateC", "stateB");
});

/* Finally, you want to control the animation for a switch. That is set with the .animationOptions keyword. These take the same arguments as normal animations. */

layerC.states.animationOptions = {
  curve: "spring",
  curveOptions: {
    tension: 200,
    friction: 3
  }
};
