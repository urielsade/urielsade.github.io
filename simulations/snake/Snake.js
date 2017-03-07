class Snake{

  constructor(row, col){

    this.length = 1;
    // this.color = rbg(255,0,0);

    this.indices = new LinkedList();

    this.indices.insert(row, col);

    this.direction = 'down';

    this.directions = ['up', 'left', 'down', 'right'];

    this.isDead = false;

    this.score = 0;

  }

  head(){
    return this.indices.head.next;
  }

  intersects(x, y){

    if(this.indices.contains(x,y)) return true;

    return false;
  }

  move(direction){

    var opposite = this.getOpposite(direction);
    if(this.direction === opposite) return;

    this.direction = direction;
  }

  getOpposite(direction){
    return this.directions[((this.directions.indexOf(direction) + 2) % 4)];
  }

  update(){

      var row = this.head().row;
      var col = this.head().col;

      switch (this.direction) {
        case 'up':
          row--;
          break;
        case 'down':
          row++;
          break;
        case 'left':
          col--;
          break;
          case 'right':
          col++;
          break;
        default:
          console.log(this.direction);
        }

        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) {
          this.isDead = true;
        } else {

           var ateFood = isFood(row, col);

           if (!ateFood)
               this.indices.pop();
           else{
               this.length++;
               this.score++;
               resetFood();
          }

          if(this.intersects(row, col)) this.isDead = true;
          this.indices.insertAt(row, col, 0);

      }

      if(this.isDead) this.kill();

  }

  getAsList(){

    var list = [];

    var node = this.head();

    while(node) { list.push(node); node = node.next; }

    return list;

  }

  kill(){

    this.length = 1;
    this.indices = new LinkedList();
    this.indices.insert(floor(random(ROWS)), floor(random(COLS)));
    this.isDead = false;
    this.score = 0;

  }

}
