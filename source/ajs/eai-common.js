MO.EEaiConstant = new function EEaiConstant(){
   var o = this;
   o.ServiceHost = "eai.logic.service";
   return o;
}
MO.EEaiStage = new function EEaiStage(){
   var o = this;
   o.Loading = 1;
   o.Login   = 2;
   o.Scene   = 3;
   return o;
}
with(MO){
   MO.FEaiEntity = function FEaiEntity(o){
      o = RClass.inherits(this, o, FObject);
      return o;
   }
   MO.FEaiEntity_dispose = function FEaiEntity_dispose(){
      var o = this;
      o.__base.FObject.dispose.call(o);
   }
}
