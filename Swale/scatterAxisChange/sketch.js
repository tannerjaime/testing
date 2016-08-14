  var options = ["temperature_f", "rain_in", "humidity_per", "wind_direction_deg", "wind_speed_mph", "pressure_pa", "light_v"];
  var optionNames = ["Temperature", "Rain", "Humidity", "Wind Direction", "Wind Speed", "Pressure", "Light"];
  var temperature_f = [];
  var tempMapped = [];
  var time = [];
  var xTemp = [];
  var times = 20;
  var xVariable = "time";
  var yVariable = "temperature_f";

  var dropdown;
  var testDiv;

  function setup() {
    // noLoop();
    
    createCanvas(windowWidth, windowHeight);
    background(232);
    var url = 'http://54.235.200.47/tower';
    loadJSON(url, loadTemp);


    dropdown = createElement('select');
    for (var i = 0; i < options.length; i++) {
      var option = createElement('option');
      option.attribute('value', options[i]);
      option.html(optionNames[i]);
      option.parent(dropdown);
    }
    dropdown.position(width / 2, height * 0.89)
    
  }

  
  function draw() {
    // background(232);

    var droptest = createDiv('what is pressed')
    dropdown.elt.onchange = function() {
      droptest.html(this.value);
    }

    for (var i = 0; i < options.length; i++) {
      if (dropdown.elt.value === options[i]) {
        xVariable = options[i];
        drawTemp();
      } else {
      } 
    }

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
    fill(232);
    stroke(232);
    rect(0, 0, width, height);
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