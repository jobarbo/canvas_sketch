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
  background(5, 89, 75);

  let margin = width/33;
  let wSpacing = width/33;
  let hSpacing = height;
  let xoff = 0.0006;
  let yoff = 0.001;
  let woff = 0.00003;
  let wContainer = wSpacing/2;
  let hContainer = hSpacing;
  let minW = 5;
  let maxW = 30;

  //displayStars();
  window.mousePressed = () => {

  }
  paint(margin,wSpacing,hSpacing,xoff,yoff,woff,wContainer,hContainer,minW,maxW);

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things

  };
}, settings);

function paint(margin,wSpacing,hSpacing,xoff,yoff,woff,wContainer,hContainer,minW,maxW){
  for(let iy = 0; iy < (height-margin); iy = iy + hSpacing){

    for(let ix = margin; ix <= (width-margin); ix = ix + wSpacing){
      //debugGrid(ix,iy,wSpacing,hSpacing);

      cx = ix;
      cy = iy;

      let y = cy;
      let xoffIteration = 0.0009;

      for(let s = 0; s < hSpacing; s++){

        let x = map(noise(xoff),0,1,cx-wContainer,cx+wContainer);
        let elW = map(noise(woff),0,1,minW,maxW);

        let elHue = map(elW,minW,maxW,355,5,true);
        let elSat = map(elW,minW,maxW,0,10,true);
        let elBright = map(elW,minW,maxW,84,100,true);
        let elAlpha = map(elW,minW,maxW,50,90,true);

        noStroke();
        //stroke(190, 53, 89,0);
        fill(elHue, elSat, elBright,elAlpha);
        ellipse(x,y,elW,elW);

        y++

        xoff += xoffIteration;
        yoff += 0.1;
        woff += 0.0005;
        //xoffIteration = xoffIteration + 0.000001;

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
