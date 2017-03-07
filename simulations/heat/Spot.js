class Spot{

  constructor(x,y,neighbors){

    this.neighbors = neighbors; // north, south, east, west
    this.pos = createVector(x,y); // top left

    this.max_heat = 1000;

    this.heat = random(this.max_heat);

    this.delta_heat = 0;

    k_value = 0.005;

  }

  updateNeighbors(pos, spot){
    this.neighbors[pos] = spot;
  }

  calculateDiffusion(){

    this.delta_heat = 0;

    for(var i = 0; i < this.neighbors.length; i++){

      if(this.neighbors[i] != null)
        this.delta_heat += -k_value * (this.heat - this.neighbors[i].heat);

    }

    this.delta_heat += -k_value * (this.heat - room_temp)/10;


  }

  update(){

    this.heat += this.delta_heat;

    this.heat = min(this.max_heat, this.heat);

    var red_val = map(this.heat, 0, this.max_heat, 0, 255) % 256;
    stroke(0);
    fill(red_val, 0, 255 - red_val);
    rect(this.pos.x, this.pos.y, scl, scl);
  }

  setNeighbor(position, neighbor){

    switch (position) {
      case 'north':
      case 0:
        this.neighbors[0] = neighbor;
        break;
      case 'south':
      case 1:
          this.neighbors[1] = neighbor;
          break;
      case 'east':
      case 2:
          this.neighbors[2] = neighbor;
          break;
      case 'west':
      case 3:
          this.neighbors[3] = neighbor;
          break;
      }

  }

  getNeighbor(position){

    switch (position) {
      case 'north':
      case 0:
        return this.neighbors[0];
      case 'south':
      case 1:
          return this.neighbors[1];
      case 'east':
      case 2:
          return this.neighbors[2];
      case 'west':
      case 3:
          return this.neighbors[3];
      default:
          return null;

    }
  }

}
