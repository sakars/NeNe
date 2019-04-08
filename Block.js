function Block(layer,count,squish,unsquish,name,input){
  this.nodes=[];
  for(var i=0;i<count;i++){
    this.nodes.push(new Neiron());
  }
  this.count=count;
  this.id=name;
  this.squish=squish;
  this.unsquish=unsquish;
  this.Cons=[];
  this.input=input;
}
Block.prototype.addConnection=function(Id) {
  this.Cons.push(Id);
}
Block.prototype.run=function(network) {
  if(!this.input){
    var sq=this.squish;
    this.nodes.forEach(function(a){
      a.calc(sq);
    });
  }
  var inp=[];
  for(var i=0;i<this.count;i++){
    inp.push(this.nodes[i].value);
  }
  for(var i=0;i<this.Cons.length;i++){
    var k=network.connections[this.id+"-"+this.Cons[i]].calc(inp);
    for(var i2=0;i2<k.length;i2++){
      network.blocks[this.Cons[i]].nodes[i2].weightsum+=k[i2];
    }
  }
}
