function Net(layers){
  this.blocks={};
  this.layerSorted=[];
  for(var i=0;i<layers;i++){
    this.layerSorted.push([]);
  }
  this.layers=layers;
  this.connections={};
  this.unnId=0;
}
Net.prototype.connect=function(fromId,toId){
  this.connections[fromId+"-"+toId]=new Weight(this.blocks[fromId].count,this.blocks[toId].count);
  this.blocks[fromId].addConnection(toId);
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
Net.prototype.forwardProp=function(){
  for(var i=0;i<this.layers;i++){
    for(var i2=0;i2<this.layerSorted[i].length;i2++){
      this.blocks[this.layerSorted[i][i2]].run(this);
    }
  }
}
Net.prototype.backProp=function(rightO){//[[key,[values]],[key,[values]]]
  for(var i=0;i<rightO.length;i++){
    var block=this.blocks[rightO[i][0]];
    for(var i2=0;i2<rightO[i][1].length){
      block.nodes[i2].error=block.nodes[i2].value-rightO[i][1][i2];
    }
  }
  for(var i=this.layers-1;i>=0;i--){
    for(var i2=0;i2<this.layerSorted[i].length;i2++){
      var block=this.blocks[this.layerSorted[i][i2]];
      block.propagateBack();
    }
  }
}
Net.prototype.getBlockOutput=function(Id){
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
   return this.sigmoid(t)*(1-this.sigmoid(t));
}
