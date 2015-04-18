//==========================================================
// <T>渲染3D对象。</T>
//
// @class
// @author maocy
// @history 150417
//==========================================================
function ME3dObject(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   //..........................................................
   // @attribute
   o._guid   = null;
   o._code   = null;
   //..........................................................
   // @method
   o.guid    = ME3dObject_guid;
   o.setGuid = ME3dObject_setGuid;
   o.code    = ME3dObject_code;
   o.setCode = ME3dObject_setCode;
   return o;
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @return String 唯一编号
//==========================================================
function ME3dObject_guid(){
   return this._guid;
}

//==========================================================
// <T>设置唯一编号。</T>
//
// @param p:guid:String 唯一编号
//==========================================================
function ME3dObject_setGuid(p){
   this._guid = p;
}

//==========================================================
// <T>获得代码。</T>
//
// @return String 代码
//==========================================================
function ME3dObject_code(){
   return this._code;
}

//==========================================================
// <T>设置代码。</T>
//
// @param p:code:String 代码
//==========================================================
function ME3dObject_setCode(p){
   this._code = p;
}
