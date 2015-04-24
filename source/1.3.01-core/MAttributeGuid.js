//==========================================================
// <T>属性唯一编号接口。</T>
//
// @face
// @author maocy
// @history 150417
//==========================================================
function MAttributeGuid(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._guid   = null;
   //..........................................................
   // @method
   o.guid    = MAttributeGuid_guid;
   o.setGuid = MAttributeGuid_setGuid;
   return o;
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @return String 唯一编号
//==========================================================
function MAttributeGuid_guid(){
   return this._guid;
}

//==========================================================
// <T>设置唯一编号。</T>
//
// @param guid:String 唯一编号
//==========================================================
function MAttributeGuid_setGuid(guid){
   this._guid = guid;
}
