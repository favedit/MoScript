//==========================================================
// <T>设计资源。</T>
//
// @class
// @author maocy
// @version 150331
//==========================================================
function FDrResource(o){
   o = RClass.inherits(this, o, FDrObject);
   //..........................................................
   // @attribute
   o._classCode = null;
   //..........................................................
   // @method
   o.classCode  = FDrResource_classCode;
   return o;
}

//==========================================================
// <T>获得类代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FDrResource_classCode(){
   return this._classCode;
}
