function Neiron(){
  this.value=0;
  this.error=0;
}
Neiron.prototype.calc=function(sum,squish){
  this.value=squish(sum);
}
