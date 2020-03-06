const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: true,
  dimensions: [12 * 300, 12 * 300],
  units: 'px',
  //pixelsPerInch: 72,

  // Turn on a render loop
  animate: true
};

const preload = () => {
  // You can use p5.loadImage() here, etc...

};

canvasSketch((context) => {
  // Sketch setup
  // Like p5.js 'setup' function

  blendMode(MULTIPLY);
  colorMode(HSB, 360, 100, 100, 100);
  background(166,23,78);

  let margin = 300;
  let wSpacing = width / 12;
  let hSpacing = height / 12;
  let gridXSpacing = width / 12;
  let gridYSpacing = height;
  let xoff = 0.6;
  let yoff = 0.001;
  let woff = 0.3;
  let wContainer = wSpacing / 2;
  let hContainer = hSpacing / 2;
  let gridWContainer = gridXSpacing / 8;
  let gridHContainer = gridYSpacing;

  //displayStars();
  woff = random(0, 1);
  yoff = random(0, 1);
  xoff = random(0, 1);

  gridLine(margin, gridXSpacing, gridYSpacing, xoff, yoff, woff, gridWContainer, gridHContainer);
  //paint(margin,wSpacing,hSpacing,xoff,yoff,woff,wContainer,hContainer);

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    if (mouseIsPressed) {
      woff = random(0, 1);
      yoff = random(0, 1);
      xoff = random(0, 1);


      paint(margin,wSpacing,hSpacing,xoff,yoff,woff,wContainer,hContainer);
    }
  };
}, settings);

function gridLine(margin, gridXSpacing, gridYSpacing, xoff, yoff, woff, gridWContainer, gridHContainer) {
  for (let iy = margin; iy < (height - margin); iy = iy + gridYSpacing) {
    for (let ix = margin; ix <= (width - margin); ix = ix + gridXSpacing) {

      //debugGrid(ix,iy,wSpacing,hSpacing);
      cx = ix;

      for (let s = margin; s < gridYSpacing-margin; s++) {

        let x = map(noise(xoff), 0, 1, cx - gridWContainer, cx + gridWContainer);
        let y = s;
        let elW = map(noise(woff), 0, 1, 2, 8);

        let elHue = map(elW, 2, 8, 158, 172, true);
        let elSat = map(elW, 2, 8, 10, 25, true);
        let elBright = map(elW, 2, 8, 45, 58, true);
        let elAlpha = map(elW, 2, 8, 8, 20, true);

        noStroke();
        //stroke(190, 53, 89,0);
        fill(elHue, elSat, elBright, elAlpha);
        ellipse(x, y, elW, elW);

        xoff += 0.001;
        yoff += 0.1;
        woff += 0.05;
      }
    }
  }
}

function paint(margin, wSpacing, hSpacing, xoff, yoff, woff, wContainer, hContainer) {
  for (let iy = margin; iy < (height - margin); iy = iy + hSpacing) {
    for (let ix = margin; ix < (width - margin); ix = ix + wSpacing) {
      //stroke(22, 58, 75,60)
      //line(ix,margin,ix,height-margin);
      //debugGrid(ix,iy,wSpacing,hSpacing);
      cx = ix + (wSpacing / 2);
      cy = iy + (hSpacing / 2);

      theHue = 20;
      theSat = 55;
      theBright = 75;


      for (let s = 0; s < wSpacing; s++) {

        let x = map(noise(xoff), 0, 1, cx - wContainer, cx + wContainer);
        let y = map(noise(yoff), 0, 1, cy - hContainer, cy + hContainer);
        let elW = map(noise(woff), 0, 1, 6, 10);

        let elHue = map(elW, 6, 9, theHue-5, theHue-5, true);
        let elSat = map(elW, 6, 9, theSat-5, theSat-5, true);
        let elBright = map(elW, 6, 9, theBright-5, theBright-5, true);
        let elAlpha = map(elW, 6, 9, 5, 25, true);

        noStroke();
        //stroke(190, 53, 89,0);
        fill(elHue, elSat, elBright, elAlpha);
        ellipse(x, y, elW, elW);

        xoff += 0.009;
        yoff += 0.009;
        woff += 0.9;
      }
    }
  }
}


function debugGrid(ix, iy, wSpacing, hSpacing) {
  strokeWeight(5)
  stroke(0, 100, 100)
  noFill();
  rect(ix, iy, wSpacing, hSpacing)
}
