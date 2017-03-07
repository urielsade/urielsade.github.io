// The game window will be scaled according to the window size.
// Row and column numbers will be fixed.
var scl;
const ROWS = 20;
const COLS = 20;

var canvas;

var snake_color;
var food_color;

var net;
var food;

var speed;
var speedSlider;
/*
 * This stores the game's current state and
 * provides sensory input for the snake in the
 * form of an array.
 *      0 -> empty spot
 *      1 -> occupied by the snake
 *      2 -> food location
 *
 */
var game_state = [];
var p;
var scoreP;
var stateP;

function windowResized() {
  var dim = Math.min(windowWidth*0.5, windowHeight*0.9);
  scl = floor(dim/ROWS);
  dim -= dim % scl;
  resizeCanvas(dim,dim);
  canvas.position(windowWidth*0.95 - width, windowHeight*0.05);
}

function setState(row, col, val) {

  let index = row*COLS + col;
  game_state[index] = val;
}

function getState(row, col) {

  let index = row*COLS + col;
  return game_state[index];
}

/* Set up the game environment */
function setup() {

  angleMode(DEGREES);
  p = createP('SPEED: ');
  speedSlider = createSlider(1,80,10);
  scoreP = createP('SCORE: 0');
  stateP = createP('GAME STATE MATRIX:<br>' + formatState());
  speed = speedSlider.value();
  frameRate(speed);

  net = new NN();
  var dim = Math.min(windowWidth*0.5, windowHeight*0.9);
  scl = floor(dim/ROWS);
  dim -= dim % scl;
  canvas = createCanvas(dim, dim);
  canvas.position(windowWidth*0.95 - width, windowHeight*0.05);

  // clear the board
  for(var row = 0; row < ROWS; row++){
    for(var col = 0; col < COLS; col++){
      setState(row, col, 0);
    }
  }

  food = createVector(floor(random(ROWS)), floor(random(COLS)));

  setState(food.x, food.y, 2);

  snake = new Snake(floor(random(ROWS)), floor(random(COLS)));

}
/*
 *
 */
function draw() {

  var fr = speedSlider.value();
  frameRate(fr);
  p.html('  SPEED: ' + fr + ' FPS')
  scoreP.html('  SCORE: ' + snake.score);

  snake.move(net.getNextAction());
  snake.update();

  background(20);

  // draw the snake
  var snakePositions = snake.getAsList();
  fill(255);
  for (node of snakePositions) {

      rect(node.col*scl, node.row*scl, scl, scl);
      fill(180);
  }

  // draw the food
  fill(255,0,0);
  rect(food.y*scl, food.x*scl, scl, scl);

  // save the game state
  for(var row = 0; row < ROWS; row++){
    for (var col = 0; col < COLS; col++) {
        setState(row, col, snake.intersects(row, col) ? 1 : 0);
    }
  }

  setState(food.x, food.y, 2);

  // write the game state
  stateP.html('GAME STATE MATRIX:<br>' +formatState());

}

function decimalToHexString(number){
    if (number < 0)
    {
        number = 0xFFFFFFFF + number + 1;
    }

    return number.toString(16).toUpperCase();
}

function isFood(row, col) {

  return food.x === row && food.y === col; //change

}

function debug(){

}


function formatState(raw_data) {

  var s = '';

  if(raw_data){

    for(var row = 0; row < ROWS; row++){
      for (var col = 0; col < COLS; col++) {

        var state = getState(row, col);

        s += state === 0 ? '00' :
             state === 1 ? '01':
             state === 2 ? '10' : 'xx';
      }
    }
  }else{

    for(var row = 0; row < ROWS; row++){
      for (var col = 0; col < COLS; col++) {
        var state = getState(row, col);

        s += state === 0 ? '00 ' :
             state === 1 ? "<i style='color:red'>01</i> ":
             state === 2 ? "<i style='color:blue'>10</i> " : 'xx ';

      }
      s += '<br>';
    }
}

  return s;

}


function resetFood() {

  do{

    food = createVector(floor(random(ROWS)), floor(random(COLS)));

  }while(snake.intersects(food.x, food.y));

}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      net.lastKeyPressed = 'up';
      break;
    case DOWN_ARROW:
      net.lastKeyPressed = 'down';
      break;
    case LEFT_ARROW:
      net.lastKeyPressed = 'left';
      break;
    case RIGHT_ARROW:
      net.lastKeyPressed = 'right';
      break;
    default: net.lastKeyPressed = null;

  }
}
