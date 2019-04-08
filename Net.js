function Net(){
  this.blocks=[];
}

Net.prototype.addBlock = function (count,inputs,squish,unsquish) {//int,function,string,[string]
  var id=this.blocks.length;
  if(squish){
    this.blocks.push(new Block(count,squish,id,unsquish));
  }else{
    this.blocks.push(new Block(count,function(a){return a;},id,function(a){return a;}));
  }
  return id;
};
