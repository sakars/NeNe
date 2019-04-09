function Neuron(){
  this.value=0;
  this.error=0;
  this.weightsum=0;
}
Neuron.prototype.calc=function(squish){
  this.value=squish(this.weightsum);
}
