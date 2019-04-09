function Weight(inp,out){
  this.weights=[];
  for(var i=0;i<inp;i++){
    this.weights.push([]);
    for(var i2=0;i2<out;i2++){
      this.weights[i].push(this.random(-2,2,2));
    }
  }
  this.out=[];
}
Weight.prototype.random=function(min,max,nbc){
  return Math.floor((Math.random()*(max-min)+min)*Math.pow(10,nbc))/Math.pow(10,nbc);
};
Weight.prototype.calc=function(input){
  var out=[];
  for(var i=0;i<this.weights[0].length;i++){
    out.push(0);
    for(var i2=0;i2<this.weights.length;i2++){
      out[i]+=input[i2]*this.weights[i2][i];
    }
  }
  return out;
};
Weight.prototype.dcalc=function(input){
  var out=[];
  for(var i=0;i<this.weights.length;i++){
    out.push(0);
    for(var i2=0;i2<this.weights[0].length;i2++){
      out[i]+=input[i2]*this.weights[i][i2];
    }
  }
  return out;
};
Weight.prototype.updatew=function(nder,pro,cof){
  for(var i=0;i<pro.length;i++){
    for(var i2=0;i2<nder.length;i2++){
      this.weights[i][i2]-=cof*pro[i]*nder[i2];
    }
  }
}
