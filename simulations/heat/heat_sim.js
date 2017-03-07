var spots = [];
var rows = 30;
var scl;
var cols;

var room_temp = 20;

var k_value;
var k_slider;
var mouse_heat;
var mouse_heat_slider;


var p1,p2,p3,p4,p5;

var randomize_btn;

function setup() {

  var canvas = createCanvas(3*windowWidth/4,windowHeight);
  canvas.position(width/3, 0);
  background(0);

  scl = floor(height/rows);
  cols = floor(width/scl);


  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      spots[i*cols + j] = new Spot(scl*j, scl*i, [null, null, null, null]);
    }


  }

  // now fill the neighbors

  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {

      var current_spot = getSpotAt(row, col);

      current_spot.setNeighbor('north', getSpotAt(row - 1, col));
      current_spot.setNeighbor('south', getSpotAt(row + 1, col));
      current_spot.setNeighbor('east', getSpotAt(row, col + 1));
      current_spot.setNeighbor('west', getSpotAt(row, col - 1));
    }
  }

  p1 = createP();
  p2 = createP();
  room_temp_slider = createSlider(0, spots[0].max_heat, 20);
  p3 = createP();
  p3.html("<a href=\"http://web.mit.edu/jorloff/www/18.03-esg/notes/heatequation.pdf\""
        + " target=\"_blank\">"
        + "Heat equation coefficient</a> (k): " + k_value + "<br>");
  p4 = createP();
  k_slider = createSlider(0, 1000, 100);
  p5 = createP();
  mouse_heat_slider = createSlider(0,spots[0].max_heat, spots[0].max_heat);

  createP("<br>");

  randomize_btn = createButton("Randomize heat");

  randomize_btn.mousePressed(randomize);

}

function draw() {

  k_value = k_slider.value()/10000;
  mouse_heat = mouse_heat_slider.value();
  room_temp = room_temp_slider.value();


  for (var i = 0; i < spots.length; i++) {
    spots[i].calculateDiffusion();
  }

  if(mouseIsPressed){
    onPress();
  }

  for (var i = 0; i < spots.length; i++) {
    spots[i].update();
  }


  p1.html("<br>Average Temperature: " + averageHeat().toPrecision(6));
  p2.html("Room Temperature: " + room_temp + " degC<br>");
  p4.html(k_value + "<br>");
  p5.html("Mouse Heat: " + mouse_heat + "<br>");

}

function averageHeat() {
  if(spots.length === 0) return 0;
  return sum(spots) / spots.length;
}

function sum() {
  var sum = 0;

  for (var i = 0; i < spots.length; i++) {
    sum += spots[i].heat;
  }

  return sum;

}

function getSpotAt(row, col) {

  if(row < 0 || row >= rows || col < 0 || col >= cols) return null;

  return spots[row*cols + col];
}

function onPress() {

  var row = floor(mouseY/scl);
  var col = floor(mouseX/scl);

  var spot = getSpotAt(row, col)
  if(spot){

    spot.heat = min(spot.heat + mouse_heat, spot.max_heat);
  }
}

function randomize() {
  for(var i = 0; i < spots.length; i++){
    spots[i].heat = random(spots[0].max_heat);
  }
}
