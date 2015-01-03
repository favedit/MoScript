//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDisplay(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._matrix   = null;
   o.position  = null;
   o.direction = null;
   o.scale     = null;
   //..........................................................
   // @method
   o.construct = FDisplay_construct;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FDisplay_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o.position = new SPoint3();
   o.direction = new SVector3();
   o.scale = new SVector3();
}
