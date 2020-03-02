const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: true,
  dimensions: [ 12*300, 12*300 ],
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

  blendMode(BLEND);
  colorMode(HSB, 360, 100, 100, 100);
  background(11, 55, 45);

  let margin = 300;
  let wSpacing = width/12;
  let hSpacing = height/12;
  let xoff = 0.6;
  let yoff = 0.001;
  let woff = 0.3;
  let wContainer = wSpacing/2;
  let hContainer = hSpacing/2;

  //displayStars();
  window.mousePressed = () => {

  }
  //paint(margin,wSpacing,hSpacing,xoff,yoff,woff,wContainer,hContainer);

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things
    if (mouseIsPressed){
      woff = random(0,1);
      yoff = random(0,1);
      xoff = random(0,1);

      paint(margin,wSpacing,hSpacing,xoff,yoff,woff,wContainer,hContainer);
    }
  };
}, settings);

function paint(margin,wSpacing,hSpacing,xoff,yoff,woff,wContainer,hContainer){
  for(let iy = margin; iy < (height-margin); iy = iy + hSpacing){

    for(let ix = margin; ix < (width-margin); ix = ix + wSpacing){
      //debugGrid(ix,iy,wSpacing,hSpacing);
      cx = ix+(wSpacing/2);
      cy = iy+(hSpacing/2);

      for(let s = 0; s < wSpacing; s++){

        let x = map(noise(xoff),0,1,cx-wContainer,cx+wContainer);
        let y = map(noise(yoff),0,1,cy-hContainer,cy+hContainer);
        let elW = map(noise(woff),0,1,0,10);

        let elHue = map(elW,2,8,28,33,true);
        let elSat = map(elW,2,8,40,60,true);
        let elBright = map(elW,2,75,90,10,true);
        let elAlpha = map(elW,4,8,0,60,true);

        noStroke();
        //stroke(190, 53, 89,0);
        fill(elHue, elSat, elBright,elAlpha);
        ellipse(x,y,elW,elW);

        xoff += 0.001;
        yoff += 0.001;
        woff += 0.1;
      }
    }
  }
}

function displayStars(){
  for(let i=0; i<2000;i++){
    let starAlpha = random(1,30);
    stroke(48,56,83,starAlpha);
    strokeWeight(random(5,10));
    point(random(width),random(height))
  }
}

function debugGrid(ix,iy,wSpacing,hSpacing){
  strokeWeight(5)
  stroke(0,100,100)
  noFill();
  rect(ix,iy,wSpacing,hSpacing)
}
