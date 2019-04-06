function Net(inbc){
  this.blocks=[new Block(inbc,function(a){return a;})];
  this.bids=["input"];
}

Net.prototype.addBlock = function (count,squish,id,inputs) {//int,function,string,[string]
  this.blocks.push(new Block(count,squish));
};
