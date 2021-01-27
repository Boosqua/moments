class Node {
   constructor(val = null){
      this.val = val;
      this.prev = null;
      this.next = null;
   }
}

class LinkedList{
   constructor(){
      this.head = new Node();
      this.tail = new Node();
      this.head.next = this.tail;
      this.tail.prev = this.head;
      this.length = 0;
   }

   getLast(){
      return this.tail.prev
   }

   getFirst(){
      return this.head.next
   }

   connect(firstNode, nextNode){
      firstNode.next = nextNode;
      nextNode.prev = firstNode;
   }

   addToTail(val){
      let prevLast = this.tail.prev;
      let newNode = new Node(val);
      this.connect(prevLast, newNode)
      this.connect(newNode, this.tail)
      this.length++;
      return newNode;
   }

   removeFromTail(){
      if( this.length === 0){
         return false;
      } 
      let removed = this.getLast();
      let newLast = removed.prev;
      this.connect(newLast, this.tail)
      this.length--
   }

   removeNode(node){
      if(node === this.head || node === this.tail){
         console.log("nope")
         return
      }
      this.connect(node.prev, node.next)
      this.length--
   }

   repositionNode(movingNode, connectNode, direction){
      this.removeNode(movingNode);
      this.length++ // how to fix?
      if(direction === "left"){
         let leftNode = connectNode.prev;
         this.connect(leftNode, movingNode);
         this.connect(movingNode, connectNode);
         // this.connect(leftNode, movingNode);
      } else {
         let rightNode = connectNode.next;
         this.connect(connectNode, movingNode);
         this.connect(movingNode, rightNode);
      }
   }

   map(){
      let values = [];
      let node = this.getFirst();
      for(let i = 0; i < this.length; i++){
         values.push(node.val);
         node = node.next;
      }
      return values;
   }
}