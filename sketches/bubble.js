export default class Bubble {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(20, 420);
    this.speed = 20;
  }
  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    stroke(60,5,95);
    fill(0,0,0,100)
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}