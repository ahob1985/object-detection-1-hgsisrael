// Author:

// Global UI Variables
let canvasDiv;
let canvas;
let textDiv;
let textP;
//let canvasDiv;

// Global ML Variables
let detector;
let img;


function setup() {
  //build UI
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP("Model loading, please wait...");
  textP.parent(textDiv);
  //load image
  img = loadImage("images/cats-dogs.jpg", imageLoaded);

}

function draw() {
  image(img, 0, 0, width, height);
  detector = ml5.objectDetector("cocossd", modelReady);
}

function imageLoaded() {

}

function modelReady() {
  detector.detect(canvas, gotResults);
}

function drawLabel(object) {
  // Draw a rectangular outline around the object
  stroke(0, 255, 0);
  noFill();
  rect(object.x, object.y, object.width, object.height);

  // Draw the label and its confidence value near the object
  noStroke();
  fill(255, 0, 0);
  textSize(20);
  let label = object.label;
  let confidence = floor(object.confidence * 100);
  text(label + ": " + confidence + "%", object.x + 10, object.y + 20);
}

function gotResults(error, results) {
  if(error){
    consloe.error(error);
  }else {
    //console.log(results);
    textP.html("I detect these objects");
    for(let i = 0; i < results.length; i++) {
      drawLabel(results[i]);
    }
  }
}
