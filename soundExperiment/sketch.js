var song;
var data = [];
var count = 0; 

function preload() {
  // Load a sound file
  song = loadSound('note.wav');
  table = loadTable("testSet.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (var r = 0; r < 900; r++) {
    for (var c = 0; c < table.getColumnCount(); c++) {
      if (table.getString(r, c).length <= 3){
      var current = table.getString(r, c);

        data.push(map(current, 0, 200, 0, height));
      }
    }
  }
  // Loop the sound forever
  // (well, at least until stop() is called)
  song.loop();
}

function drawLines() {
  for (var i = 0; i < data.length; i++) {
  // rect(width/2, height/2, 1, 100);
    rect(i*2,height - data[i], 1, data[i]);
    
  //   // console.log(data[i]);
  }
}

function draw() {
  background(200);
  drawLines();
  
  // Set the volume to a range between 0 and 1.0
  // var volume = map(mouseX, 0, width, 0, 1);
  // volume = constrain(volume, 0, 1);
  // song.amp(volume);

  // Set the rate to a range between 0.1 and 4
  // Changing the rate alters the pitch
  var currentLocation = data[count];
  var speed = map(currentLocation, 0, height, 0, 4);
  speed = constrain(speed, 0.01, 4);
  song.rate(speed);

  // Draw some circles to show what is going on
  stroke(0);
  fill(51, 100);
  // ellipse(mouseX, 100, 48, 48);
  stroke(0);
  fill(51, 100);
  ellipse(100, mouseY, 48, 48);
} // ellipse(mouseX, 100, 48, 48);