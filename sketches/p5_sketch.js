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
  animate: false
};

const preload = () => {
  // You can use p5.loadImage() here, etc...

};

canvasSketch((context) => {
  // Sketch setup
  // Like p5.js 'setup' function

  blendMode(BLEND);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 96);

  let margin = width/100;
  let wSpacing = width/10-margin;
  let hSpacing = height/10-margin;
  let xoff = 0.6;
  let yoff = 0.001;
  let hoff = 0.1;
  let woff = 0.03;
  let wContainer = wSpacing/1.5;
  let hContainer = hSpacing/1.5;

  //displayStars();
  window.mouseClicked = () => {
    //paint(margin,wSpacing,hSpacing,xoff,yoff,hoff,woff,wContainer,hContainer);
  }
  paint(margin,wSpacing,hSpacing,xoff,yoff,hoff,woff,wContainer,hContainer);

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things


  };
}, settings);

function paint(margin,wSpacing,hSpacing,xoff,yoff,hoff,woff,wContainer,hContainer){
  console.log(keyCode);
  for(let ix = margin; ix < (width-margin); ix = ix + wSpacing){
    for(let iy = margin; iy < (height-margin); iy = iy + hSpacing){
      //debugGrid(ix,iy,wSpacing,hSpacing);
      cx = ix+(wSpacing/2);
      cy = iy+(hSpacing/2);

      for(let s = 0; s < wSpacing; s++){
        let x = map(noise(xoff),0,1,cx-wContainer,cx+wContainer);
        let y = map(noise(yoff),0,1,cy-hContainer,cy+hContainer);
        let hue = map(noise(hoff),0,1,0,100);
        //let elW =  map(abs(x-width/2),0,width,30, 0)
        let elW = map(noise(woff),0,1,0,30);
        let elA = map(elW,0,15,0,50);

        //noStroke();
        stroke(191, 5, 95,0);
        fill(209, 57, 50,elA);
        ellipse(x,y,elW,elW);

        xoff += 0.005;
        yoff += 0.005;
        hoff += 0.1;
        woff += 0.0005;
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
