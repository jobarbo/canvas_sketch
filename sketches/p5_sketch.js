const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
new p5();

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: true,
  dimensions: [ 12*300, 18*300 ],
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

  //blendMode(ADD);
  colorMode(HSB, 360, 100, 100, 100);
  //colorMode(RGB);
  let x = 0;
  let y = 0;

  let h = 255;
  let s = 0;
  let b = 100;

  let spacing = 50;

  background(5, 30, 95);

  function makeMaze() {

    strokeCap(ROUND);
    strokeWeight(16);
    for(x = 0;x<width;x+=spacing){

      for(y = 0;y<=height;y+=spacing){
        let rand = random(0.5,1);
        if (rand < 0.25) {
          stroke(h,s,b);
          line(x, y, x + spacing, y);
        } else if (rand > 0.25 && rand < 0.5) {
          stroke(h,s,b);
          line(x, y+spacing , x, y);
        } else if (rand > 0.5 && rand < 0.75) {
          stroke(h,s,b);
          line(x, y+spacing , x+spacing, y);
        } else if (rand > 0.75 && rand < 1) {
          stroke(h,s,b);
          line(x, y , x+spacing, y+spacing);
        }
        if (y >= height){
          console.log("done");
        }
      }
    }
  }

  makeMaze();

  // Return a renderer, which is like p5.js 'draw' function
  return ({ p5, time, width, height }) => {
    // Draw with p5.js things


  };
}, settings);
