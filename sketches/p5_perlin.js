const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: true,
  dimensions: [ 12*300, 12*300 ],
  //pixelsPerInch: 72,
  units: 'px',
  // Turn on a render loop
  animate: false
};

const preload = () => {
  // You can use p5.loadImage() here, etc...

};

canvasSketch((context) => {
  // Sketch setup
  // Like p5.js 'setup' function

  // Set the color mode
  colorMode(HSB, 360, 100, 100, 100);
  //blendMode(ADD);
  background(60,5,95);
  let margin = width/41;
  let wSpacing = width-margin;
  let hSpacing = height-margin;
  let xoff = 0.6;
  let yoff = 0.1;
  let hoff = 0.1;
  let woff = 0.3;
  let wContainer = wSpacing;
  let hContainer = hSpacing/2;

  //displayStars();


  for(let ix = margin/2; ix < (width-margin); ix = ix + wSpacing){
    for(let iy = margin/2; iy < (height-margin); iy = iy + hSpacing){
      //strokeWeight(5)
      //stroke(0,100,100)
      //noFill();
      //rect(ix,iy,wSpacing,hSpacing)
      cx = ix+(wSpacing/2);
      cy = iy+(hSpacing/2);

      for(let s = 0; s < 100000; s++){
        let x = map(noise(xoff),0,1,cx-wContainer,cx+wContainer);
        let y = map(noise(yoff),0,1,cy-hContainer,cy+hContainer);
        //let elW = map(noise(woff),0,1,0,10);
        let elW =  map(abs(x-width/2),0,width/2,6, 0)
        let hue = map(noise(hoff),0,1,0,100);

        noStroke();
        //stroke(0,0,0)
        fill(220,42,60,100)
        ellipse(x,y,elW,elW);

        xoff += 0.0005;
        yoff += 0.05;
        hoff += 0.1;
        woff += 0.01;
      }
    }
  }

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things


  };
}, settings);

function displayStars(){
  for(let i=0; i<2000;i++){
    let starAlpha = random(1,30);
    stroke(48,56,83,starAlpha);
    strokeWeight(random(5,10));
    point(random(width),random(height))
  }
}
