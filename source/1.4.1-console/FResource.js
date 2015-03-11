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
   o._guid    = null;
   o._code    = null;
   o._label   = null;
   //..........................................................
   // @method
   o.guid     = FResource_guid;
   o.setGuid  = FResource_setGuid;
   o.code     = FResource_code;
   o.setCode  = FResource_setCode;
   o.label    = FResource_label;
   o.setLabel = FResource_setLabel;
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
// <T>设置唯一编号。</T>
//
// @method
// @param p:guid:String 唯一编号
//==========================================================
function FResource_setGuid(p){
   this._guid = p;
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
// <T>设置代码。</T>
//
// @method
// @param p:code:String 代码
//==========================================================
function FResource_setCode(p){
   this._code = p;
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

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param p:label:String 标签
//==========================================================
function FResource_setLabel(p){
   this._label = p;
}
