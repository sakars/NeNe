function Block(count,squish,id,unsquish){
  this.nodes=[];
  for(var i=0;i<count;i++){
    this.nodes.push(new Neiron());
  }
  this.id=id;
  this.squish=squish;
  this.unsquish=unsquish;
}
