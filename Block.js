function Block(layer,count,squish,unsquish,name,input){
  this.nodes=[];
  for(var i=0;i<count;i++){
    this.nodes.push(new Neuron());
  }
  this.count=count;
  this.id=name;
  this.squish=squish;
  this.unsquish=unsquish;
  this.Cons=[];
  this.BCons=[];
  this.input=input;
}
Block.prototype.addBCon=function(Id){
  this.BCons.push(Id);
}
Block.prototype.addConnection=function(Id) {
  this.Cons.push(Id);
}
Block.prototype.run=function(network) {
  if(!this.input){
    var sq=this.squish;
    this.nodes.forEach(function(a){
      a.calc(sq);
      a.weightsum=0;
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
Block.prototype.propagateBack=function(network){
  var inp=[];
  for(var i=0;i<this.nodes.length;i++){
    var neur=this.nodes[i];
    neur.error=neur.error*this.unsquish(neur.value);
    neur.bias-=network.learningC*neur.error;
    inp.push(neur.error);
  }
  for(var i=0;i<this.BCons.length;i++){
    var unscrambledw=network.connections[this.BCons[i]+"-"+this.id].dcalc(inp);
    network.setBlockD(this.BCons[i],unscrambledw);
    network.connections[this.BCons[i]+"-"+this.id].updatew(inp,network.getBlockOutput(this.BCons[i]),network.learningC);
  }
  network.resetBlockD(this.id);
}
