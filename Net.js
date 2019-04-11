function Net(layers){
  this.blocks={};
  this.layerSorted=[];
  for(var i=0;i<layers;i++){
    this.layerSorted.push([]);
  }
  this.layers=layers;
  this.connections={};
  this.unnId=0;
  this.learningC=0.1;
}
Net.prototype.connect=function(fromId,toId){
  this.connections[fromId+"-"+toId]=new Weight(this.blocks[fromId].count,this.blocks[toId].count);
  this.blocks[fromId].addConnection(toId);
  this.blocks[toId].addBCon(fromId);
}
Net.prototype.addBlock = function (count,layer,squish,unsquish,name,input) {//int,function,string,[string]
  if(name){
    var name=name;
  }else{
    var name=this.unnId;
    this.unnId++;
  }
  if(squish){
    this.blocks[name]=new Block(layer,count,squish,unsquish,name,input);
  }else{
    this.blocks[name]=new Block(layer,count,function(a){return a;},function(a){return a;},name,input);
  }
  this.layerSorted[layer].push(name);
  return name;
};
Net.prototype.setBlock = function (Id,values) {
  for(var i=0;i<values.length;i++){
    this.blocks[Id].nodes[i].value=values[i];
  }
};
Net.prototype.setBlockD = function (Id,values) {
  for(var i=0;i<values.length;i++){
    this.blocks[Id].nodes[i].error+=values[i];
  }
};
Net.prototype.resetBlockD = function (Id) {
  for(var i=0;i<this.blocks[Id].nodes.length;i++){
    this.blocks[Id].nodes[i].error=0;
  }
};
Net.prototype.forwardProp=function(){
  for(var i=0;i<this.layers;i++){
    for(var i2=0;i2<this.layerSorted[i].length;i2++){
      this.blocks[this.layerSorted[i][i2]].run(this);
    }
  }
}
Net.prototype.backProp=function(rightO){//[[key,[values]],[key,[values]]]
  var err=[];
  for(var i=0;i<rightO.length;i++){
    var block=this.blocks[rightO[i][0]];
    err.push([]);
    for(var i2=0;i2<rightO[i][1].length;i2++){
      block.nodes[i2].error=block.nodes[i2].value-rightO[i][1][i2];
      err[i].push(block.nodes[i2].error);
    }
  }
  for(var i=this.layers-1;i>=0;i--){
    for(var i2=0;i2<this.layerSorted[i].length;i2++){
      var block=this.blocks[this.layerSorted[i][i2]];
      block.propagateBack(this);
    }
  }
  return err;
}
Net.prototype.getBlockOutput=function(Id,round){
  var block=this.blocks[Id];
  var ou=[];
  for(var i=0;i<block.count;i++){
    ou.push(block.nodes[i].value);
  }
  return ou;
}
Net.prototype.noSquish=function(a){return a;};
Net.prototype.sigmoid=function(t) {
    return 1/(1+Math.pow(Math.E, -t));
}
Net.prototype.Isigmoid=function(t){
   //ln(y/(1-y))
   var sigmoid=function(t) {
       return 1/(1+Math.pow(Math.E, -t));
   }
   return sigmoid(t)*(1-sigmoid(t));
}
