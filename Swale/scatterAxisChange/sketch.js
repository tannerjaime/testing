var temperature_f = [];
var tempMapped = [];
var time = [];
var xTemp = [];
var times = 20;


function setup() {
  noLoop();
  createCanvas(windowWidth, windowHeight);

  var url = 'http://54.235.200.47/tower';
  loadJSON(url, loadTemp);
}

function draw() {
  background(222);
}

function loadTemp(weather) {

  // get the humidity value out of the loaded JSON
  for (var i = 0; i < times; i++) {
    temperature_f.push(weather.results[i].temperature_f);
    time.push(i);

    xTemp.push(map(i, 0, times, width / 3, width - width / 3));
    tempMapped.push(map(temperature_f[i], 0, 100, height - height / 3, height / 4));
  }
  
  drawTemp();
}



function drawTemp() {
  majorLines();
  strokeLinesX();
  strokeLinesY();

  for (var r = 1; r < times; r++) {
    stroke(14, 164, 252);
    strokeWeight(4);
    line(xTemp[r - 1], tempMapped[r - 1], xTemp[r], tempMapped[r]);

  }
}

function majorLines() {
  var xMin = windowWidth / 3;
  var xMax = windowWidth - windowWidth / 3;
  var yMin = windowHeight - windowHeight / 3;
  var yMax = windowHeight / 4;

  //major lines 
  stroke(86);
  strokeWeight(1);
  line(xMin, yMin, xMax, yMin);
  // line(xMin, yMax, xMin, yMin);


}

function strokeLinesX(Xvalue) {
  var xMin = windowWidth / 3;
  var yMin = windowHeight - windowHeight / 3;
  //stroke lines 
  stroke(86, 86, 86, 100);
  strokeWeight(0.5);
  for (var i = 0; i < times; i++) {
    var x = map(i, 0, 20, width / 3, width - width / 3);
    line(x, yMin - 3, x, yMin + 3);
  }
}

function strokeLinesY() {
  var xMin = windowWidth / 3;
  var yMin = windowHeight - windowHeight / 3;
  var xMax = windowWidth - windowWidth / 3;
  for (var z = 0; z < 110; z = z + 10) {
    var y = map(z, 0, 100, yMin, windowHeight / 4);
    stroke(86, 86, 86, 100);
    strokeWeight(0.25);
    line(xMin - 3, y, xMax, y);
  }
}