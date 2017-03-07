
class NN {
  constructor() {

    this.mode = 'USER';
    // this.mode = 'NEURAL_NET';
    // this.mode = 'BOT';

    this.lastKeyPressed = 'right';

    this.epsilon = 0.01;
    this.input_dim = -1; //change
    this.output_dim = 4;

  }

  // getNextAction() {
  //
  //   if(this.mode === 'USER'){
  //     return this.lastKeyPressed;
  //   }else{
  //     return 'right';
  //   }
  // }

  getNextAction() {

    if(this.mode === 'USER'){
      return this.lastKeyPressed;
    }else if(this.mode = 'BOT'){

      var foodV = createVector(food.x, food.y);
      var head = snake.head();
      var snakeHead = createVector(head.row, head.col);

      var vector = p5.Vector.sub(foodV, snakeHead);

      var angle = (vector.heading() + 180) % 360;

      // console.log(angle);

      var index = floor((angle/360)*4);

      // console.log(index >= 4 || index < 0);

      if(snake.directions[index] === snake.getOpposite(snake.direction) || this.wouldDie(snakeHead, snake.directions[index])){
        return snake.directions[(index+1)%4];
      }else
        return snake.directions[index];

    }else if(this.mode === 'NEURAL_NET'){
      return 'left';
    }else{
      console.error("INVALID MODE");
    }
  }

  wouldDie(sh, dir){

    var row = sh.x;
    var col = sh.y;

    switch (dir) {
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
        console.log(dir);
      }
      return snake.intersects(row, col);

  }

}
