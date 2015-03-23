//==========================================================
// <T>渲染3D对象。</T>
//
// @class
// @author maocy
// @history 150206
//==========================================================
function FE3rObject(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   //..........................................................
   // @attribute
   o._guid = null;
   o._code = null;
   //..........................................................
   // @method
   o.guid    = FE3rModel_guid;
   o.setGuid = FE3rModel_setGuid;
   o.code    = FE3rModel_code;
   o.setCode = FE3rModel_setCode;
   return o;
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @return String 唯一编号
//==========================================================
function FE3rModel_guid(){
   return this._guid;
}

//==========================================================
// <T>设置唯一编号。</T>
//
// @param p:guid:String 唯一编号
//==========================================================
function FE3rModel_setGuid(p){
   this._guid = p;
}

//==========================================================
// <T>获得代码。</T>
//
// @return String 代码
//==========================================================
function FE3rModel_code(){
   return this._code;
}

//==========================================================
// <T>设置代码。</T>
//
// @param p:code:String 代码
//==========================================================
function FE3rModel_setCode(p){
   this._code = p;
}
