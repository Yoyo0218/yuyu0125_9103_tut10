let spotCircleR = [30, 35, 40, 45, 50]; //different sizes of circles
let spotR = 2; //Radius of small circles
let spacing = 2;
let patterns = [];
const hexagonSide = 69;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  arrangePatterns();
  for (let pattern of patterns) {
    pattern.display();
  }
}


class Hexagon {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side;
  }


  display() {
    push();
    translate(this.x, this.y);
    stroke(42, 116, 17);
    strokeWeight(4);
    fill(52, 179, 90);
    rotate(PI / 2);
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += TWO_PI / 6) {
      let sx = cos(angle) * this.side;
      let sy = sin(angle) * this.side;
      vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
  }
}


class CirclePattern {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.randomColor = color(random(255), random(255), random(255));
    this.innerColors = innerColors();
    this.coreColor = color(random(['#F51531', '#018221']));
    this.spotCirclePositions = [];


    function innerColors() {
      let colors = [];
     
      for (let i = 0; i < 10; i++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
   
        let colorValue = color(r, g, b);
   
        colors.push(colorValue);
      }
   
      return colors;
    }


    for (let radius of spotCircleR) {
      let circumference = TWO_PI * radius;
      let numSpots = floor(circumference / (2 * spotR + spacing));
      for (let i = 0; i < numSpots; i++) {
        let angle = map(i, 0, numSpots, 0, TWO_PI);
        let x = cos(angle) * radius;
        let y = sin(angle) * radius;
        this.spotCirclePositions.push({ x, y });
      }
    }


    this.hexagon = new Hexagon(0, 0, hexagonSide);
  }
 


  display() {
    push();
    translate(this.x, this.y);
    this.hexagon.display();


    noStroke();
    fill(145, 225, 147);
    ellipse(0, 0, 110, 110);


    for (let pos of this.spotCirclePositions) {
      fill(this.randomColor);
      noStroke();
      ellipse(pos.x, pos.y, spotR * 2, spotR * 2);
    }


    fill(this.randomColor);
    ellipse(0, 0, 50, 50);


    for (let i = 0; i < 10; i++) {
      let radius = random(30, 50);
      fill(this.innerColors[i]);
      ellipse(0, 0, radius, radius);
    }


    fill(0);
    ellipse(0, 0, 30, 30);
    fill(this.coreColor);
    ellipse(0, 0, 20, 20);
    fill(255);
    ellipse(0, 0, 10, 10);
    pop();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  arrangePatterns();
  background(0);
  for (let pattern of patterns) {
    pattern.display();
  }
}


function arrangePatterns() {
  patterns = []; // Clear the patterns array for a new arrangement
  let yOffset = 0; // Initialize vertical offset
  let alternate = false; // Used to determine the starting offset for each row


  while (yOffset < height + 55) { // Continue arranging while vertical offset is within window height + 55
    let xOffset; // Declare a variable to set the horizontal offset
    if (alternate) {
      xOffset = 110; // Set xOffset to 110 if alternate is true
    } else {
      xOffset = 50; // Set xOffset to 50 if alternate is false
    }


    for (let x = -xOffset; x < width + 55; x += 120) { // From -xOffset to window width + 55, add a pattern every 120
      patterns.push(new CirclePattern(x, yOffset)); // Create a pattern and add it to the array
    }
    yOffset += 104; // Increase vertical offset for the next row
    alternate = !alternate; // Toggle alternate to ensure different starting offsets for each row
  }
}



