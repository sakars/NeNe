function Block(count,squish){
  this.nodes=[];
  for(var i=0;i<count;i++){
    this.nodes.push(new Node());
  }
}
