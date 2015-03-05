//==========================================================
// <T>资源基类。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
function FResource(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._guid  = null;
   o._code  = null;
   o._label = null;
   //..........................................................
   // @method
   o.guid   = FResource_guid;
   o.code   = FResource_code;
   o.label  = FResource_label;
   return o;
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FResource_guid(){
   return this._guid;
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FResource_code(){
   return this._code;
}

//==========================================================
// <T>获得标签。</T>
//
// @method
// @return String 标签
//==========================================================
function FResource_label(){
   return this._label;
}
