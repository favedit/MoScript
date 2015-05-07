//==========================================================
// <T>资源分组。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
function FResourceGroup(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._code      = null;
   o._resources = null;
   //..........................................................
   // @method
   o.code       = FResourceGroup_code;
   return o;
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FResourceGroup_code(){
   return this._code;
}
