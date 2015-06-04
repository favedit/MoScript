MO.EEaiStage = new function EEaiStage(){
   var o = this;
   o.Country     = 1;
   o.Group       = 2;
   o.GroupReport = 3;
   o.Company     = 4;
   return o;
}
var REai = function REai(){
   var o = this;
   o.version = '0.1.0';
   return o;
}
REai.prototype.initialize = function REai_initialize(){
}
REai.prototype.release = function REai_release(){
}
var Eai = new REai();
MO.FEaiStage = function FEaiStage(o){
   o = MO.RClass.inherits(this, o, MO.FObject);
   return o;
}
