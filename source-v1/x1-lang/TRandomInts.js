//============================================================
// TRandomInts
//============================================================
function TRandomInts(){
   var o = this;
   o.data   = new Array();
   o.max    = 1;
   // Method
   o.setBetween = TRandomInts_setBetween;
   o.setMax     = TRandomInts_setMax;
   o.next       = TRandomInts_next;
   return o;
}

//============================================================
//TRandomInts
//============================================================
function TRandomInts_setBetween(min, max){
   var o = this;
   o.max = max - min;
   for(var n=min; n<=max; n++){
      o.data[n - min] = n;
   }
}
// ------------------------------------------------------------
// source, value
function TRandomInts_setMax(m){
   var o = this;
   o.max = m;
   for(var n=0; n<m; n++){
      o.data[n] = n;
   }
}
// ------------------------------------------------------------
function TRandomInts_next(){
   var o = this;
   var r = RRandom.rand(o.max);
   for(var n=0; n<o.max; n++){
      var i = (n + r) % o.max;
      if(null != o.data[i]){
         var rn = o.data[i];
         o.data[i] = null;
         return rn;
      }
   }
}
