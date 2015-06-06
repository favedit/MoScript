MO.EEaiConstant = new function EEaiConstant(){
   var o = this;
   o.ServiceHost = "eai.logic.service";
   return o;
}
MO.EEaiStage = new function EEaiStage(){
   var o = this;
   o.Country     = 1;
   o.Group       = 2;
   o.GroupReport = 3;
   o.Company     = 4;
   return o;
}
MO.FEaiStage = function FEaiStage(o){
   o = MO.RClass.inherits(this, o, MO.FObject);
   return o;
}
