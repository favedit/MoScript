MO.FG2dObject = function FG2dObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o.setup   = MO.FG2dObject_setup;
   o.dispose = MO.FG2dObject_dispose;
   return o;
}
MO.FG2dObject_setup = function FG2dObject_setup(){
}
MO.FG2dObject_dispose = function FG2dObject_dispose(){
   var o = this;
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
