var temperature_f = [];
var tempMapped = [];
var time = [];
var xTemp = [];
var times = 20;
var keys = ["temperature_f", "rain_in", "humidity_per", "wind_direction_deg", "wind_speed_mph", "pressure_pa", "light_v"];
var keyNames = ["Temperature", "Rain", "Humidity", "Wind Direction", "Wind Speed", "Pressure", "Light"];

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
  for (var i = 0; i < weather.results.length; i++) {
    temperature_f.push(weather.results[i].temperature_f);
    time.push(i);

    xTemp.push(map(i, 0, times, width / 3, width - width / 3));
    tempMapped.push(map(temperature_f[i], 0, 100, height - height / 3, height / 4));
  }
  xLines(7, weather);
  // drawData();
}



function xLines(categories, weather) {
  var xMin = windowWidth / 6;
  var xMax = windowWidth - windowWidth / 6;
  var yMin = windowHeight - windowHeight / 3;
  var yMax = windowHeight / 4;

  //major lines 

  for (var j = 0; j < categories; j++) {
    stroke(86);
    strokeWeight(1);
    var y = map(j, 0, categories, height - height / 8, height / 8);
    line(xMin, y, xMax, y);
    textAlign(RIGHT);
    noStroke();
    text(keyNames[j], xMin - 50, y)

    //circles
    for (var m = 0; m < weather.results.length; m++) {
        var x = map(m, 0, weather.results.length, xMin, xMax);
        var value = weather.results[m][keys[j]];
        ellipse(x, y, 5, value);
    }
  }

}
