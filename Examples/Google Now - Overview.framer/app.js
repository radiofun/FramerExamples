/* By Noah Levin www.nlevin.com */
var PSD, animateCurveSpeed, animateInCurve, animateOrigin, animateOutCurve, animateSpeed, gotoHome, gotoNow, homeCardBorder, homeCardShadowSize, homeMovieScale, homeMovieY, homeTimeScale, homeTimeY, homeTrafficScale, homeTrafficY, isIphone, isSafari, isWebApp, layer, layerName, nowCardBorder, nowCardShadowSize, nowMovieY, nowTimeY, nowTrafficY, pointerType, toggler;

PSD = Framer.Importer.load("imported/GoogleNow");

/* Settings */

animateSpeed = 0.18;

animateCurveSpeed = 0.2;

animateInCurve = "spring(400,30,0)";

animateOutCurve = animateInCurve;

animateOrigin = "50% 50%";

homeCardBorder = "1px solid rgba(0,0,0,.2)";

homeCardShadowSize = "0 1px 2px rgba(0,0,0,.2)";

homeTrafficScale = ".953";

homeTrafficY = "960";

homeMovieScale = ".92";

homeMovieY = "927";

homeTimeScale = ".88";

homeTimeY = "946";

nowTrafficY = "298";

nowMovieY = "795";

nowTimeY = "1380";

nowCardBorder = "1px solid transparent";

nowCardShadowSize = "0 1px 1px rgba(0,0,0,.2)";

/* Animate to Now View */

gotoNow = function() {
  PSD["Logo"].animate({
    properties: {
      y: 17,
      scale: 0.6
    },
    curve: animateInCurve,
    time: animateCurveSpeed
  });
  PSD["Searchbox"].animate({
    properties: {
      y: 165,
      scale: 1.03,
      height: 73
    },
    curve: animateInCurve,
    time: animateCurveSpeed
  });
  PSD["TrafficCard"].animate({
    properties: {
      y: nowTrafficY,
      scale: 1
    },
    curve: animateInCurve,
    time: animateCurveSpeed
  });
  PSD["MovieCard"].animate({
    properties: {
      y: nowMovieY,
      scale: 1
    },
    curve: animateInCurve,
    time: animateCurveSpeed
  });
  PSD["TimeCard"].animate({
    properties: {
      y: nowTimeY,
      scale: 1
    },
    curve: animateInCurve,
    time: animateCurveSpeed
  });
  PSD["Context"].animate({
    properties: {
      opacity: 1,
      y: -20
    },
    curve: "ease-out",
    time: animateSpeed
  });
  PSD["Actions"].animate({
    properties: {
      y: 760,
      opacity: 0
    },
    curve: "ease-out",
    time: animateSpeed
  });
  PSD["Top"].animate({
    properties: {
      y: -20,
      opacity: 0
    },
    curve: "ease-out",
    time: animateSpeed
  });
  document.getElementsByTagName("body")[0].className = "now";
};

/* Animate back home */

gotoHome = function() {
  PSD["Logo"].animate({
    properties: {
      y: 301,
      scale: 1
    },
    curve: animateOutCurve,
    time: animateCurveSpeed
  });
  PSD["Searchbox"].animate({
    properties: {
      y: 470,
      scale: 1,
      height: 93
    },
    curve: animateOutCurve,
    time: animateCurveSpeed
  });
  PSD["TrafficCard"].animate({
    properties: {
      y: homeTrafficY,
      scale: homeTrafficScale
    },
    curve: animateOutCurve,
    time: animateCurveSpeed
  });
  PSD["MovieCard"].animate({
    properties: {
      y: homeMovieY,
      scale: homeMovieScale
    },
    curve: animateOutCurve,
    time: animateCurveSpeed
  });
  PSD["TimeCard"].animate({
    properties: {
      y: homeTimeY,
      scale: homeTimeScale
    },
    curve: animateOutCurve,
    time: animateCurveSpeed
  });
  PSD["Actions"].animate({
    properties: {
      y: 820,
      opacity: 1
    },
    curve: animateOutCurve,
    time: animateSpeed
  });
  PSD["Top"].animate({
    properties: {
      y: 22,
      opacity: 1
    },
    curve: animateOutCurve,
    time: animateSpeed
  });
  PSD["Context"].animate({
    properties: {
      opacity: 0,
      y: 0
    },
    curve: animateOutCurve,
    time: animateSpeed
  });
  document.getElementsByTagName("body")[0].className = "home";
};

/* Check device types */

isIphone = function() {
  if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
    return true;
  }
};

isWebApp = function() {
  return window.navigator.standalone;
};

isSafari = function() {
  return navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("Chrome") === -1;
};

/* Set stage */

gotoHome();

/* Check pointer types */

pointerType = "click";

if (isIphone()) {
  pointerType = "touchstart";
}

/* Trigger animation on click/tap anywhere */

toggler = Utils.toggle(gotoNow, gotoHome);

PSD["Content"].on(pointerType, function(e) {
  var movePage;
  movePage = void 0;
  e.preventDefault();
  movePage = toggler();
  return movePage();
});

/* Don't show status bar for web apps */

if (isWebApp()) {
  PSD["StatusBar"].opacity = 0;
} else {
  PSD["Content"].y += 40;
}

/* Chrome and safari render webkit filters differently, adjust to turn logo white accordingly */

if (isSafari() || isIphone()) {
  document.getElementsByTagName("html")[0].className = "safari";
}

/* Link up the layer names for css */

for (layerName in PSD) {
  layer = PSD[layerName];
  layer._element.setAttribute("name", layerName);
}
