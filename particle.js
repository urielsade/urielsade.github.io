
function Particle(){

  this.pos = getStartingVector();
  this.vel = createVector();
  this.max_speed = 7;

}

Particle.prototype.accelerate = function(vector_field){
  var column = floor(this.pos.x / (scl+1));
  var row = floor(this.pos.y / (scl+1));
  var i = row * cols + column;
  var vector = vector_field[i];
  vector.normalize();
  vector.mult(100);
  this.vel.add(vector);
  this.vel.limit(this.max_speed);
  this.pos.add(this.vel);
  this.checkBounds();
  stroke(255, 255, 255);
  strokeWeight(2);
  point(this.pos.x, this.pos.y);
}

Particle.prototype.checkBounds = function functionName() {

  if(this.pos.x < 0 || this.pos.x > width - 1
  || this.pos.y < 0 || this.pos.y > height - 1){

    this.pos = getStartingVector();
  }

}


function getStartingVector(){

  var rand = floor(random(4));

  switch (rand) {
    case 0:
      return createVector(1, random(height-1));
    case 1:
      return createVector(width, random(height-1));
    case 2:
      return createVector(random(width-1), 1);
    case 4:
      return createVector(random(width-1), height);
    default: return createVector();

  }

}
