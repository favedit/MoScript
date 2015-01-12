//===========================================================
//
//===========================================================
var RRandom = new function(o){
   if(!o){o=this};
   o.seed = (new Date()).getTime();
   // Define
   o.get  = RRandom_get;
   o.rand = RRandom_rand;
   // Construct
   RMemory.register('RRandom', o);
   return o;
}

//===========================================================
//
//===========================================================
function RRandom_get(){
   var o = this;
   o.seed = (o.seed * 9301 + 49297) % 233280;
   return o.seed/(233280.0); 
}

//===========================================================
//
//===========================================================
function RRandom_rand(n){
   return Math.ceil(this.get()*n);
}

