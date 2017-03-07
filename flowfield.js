
/*
 *  Background sketch
 *  Author: Uriel Sade
 *  Date: Feb. 22, 2017
 */
var canvas;
var time_x, time_y, time_z, time_inc;

var field = [];
var particles = [];

var rows, cols;
var scl = 20;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-value', '-1');
  canvas.style('opacity', '0.99');
  background(0,0,0,0);
  rows = 25;
  scl = floor(height/rows);
  cols = floor(width/scl);
  time_inc = 0.2;
  time_x = time_y = time_z = 0;

  for(var i = 0; i < 20; i++){
    particles[i] = new Particle();
  }


}

function draw(){

  background(0,0,0,10);

  fill(255);
  // text("by Uriel Sade", width/40, height- height/40);
  noFill();
  field = [];
  time_y = 0;
  for(var y = 0; y < rows; y++){
    time_x = 0;
    for(var x = 0; x < cols; x++){
      push();
      translate(x*scl + scl/2, y*scl + scl/2);
      var direction_vector = p5.Vector.fromAngle(noise(time_x, time_y, time_z)*2*PI + PI);
      rotate(direction_vector.heading());
      stroke(0,255,0, 7);
      strokeWeight(1);
      line(-scl/6,0,scl/6,0);
      pop();
      field[y* cols + x] = direction_vector;
      time_x += time_inc;
    }
    time_y += time_inc;
    time_z += 0.0002;
  }

  updateParticles();

}

function updateParticles(){

  for(var i = 0; i < particles.length; i++){
    particles[i].accelerate(field);
  }
}

function windowResized(){
  setup();
  
}
