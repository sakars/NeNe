function Neuron(){
  this.value=0;
  this.error=0;
  this.weightsum=0;
  this.bias=(Math.random())-0.5;
}
Neuron.prototype.calc=function(squish){
  this.value=Math.round(squish(this.weightsum+this.bias)*10000)/10000;
}
