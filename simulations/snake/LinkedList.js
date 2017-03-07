class LinkedList{

  constructor(){

    this.head = new Node(-1,-1);

    this.length = 0;

  }

  insertAt(row, col, pos) {

    var node = this.head;

    while(pos > 0){

      node = node.next;

      if(!node) return null;

      pos--;
    }

    var newNode = new Node(row, col);
    newNode.next = node.next;
    node.next = newNode;

    this.length++;

  }

  insert(row, col) {

    var node = this.head;

    while(node.next){

      node = node.next;
    }

    node.next = new Node(row, col);

    this.length++;

  }

  get(pos) {

    var node = this.head;

    while(pos > 0){

      node = node.next;

      if(!node) return null;

      pos--;
    }

    return node.next;

  }

  contains(x,y){

    var node = this.head.next;

    while(node){

      if(node.row === x && node.col === y) return true;
      node = node.next;
    }

    return false;

  }

  pop(){

    var node = this.head;

    var n = this.length - 1;

    while(n > 0){

      node = node.next;

      if(!node) return;

      n--;

    }

    node.next = null;
    this.length--;

  }

}

class Node {
  constructor(row,col) {
    this.row = row;
    this.col = col;
    this.next = null;
  }
}
