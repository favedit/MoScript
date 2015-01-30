//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FRs3Object(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._guid       = null;
   //..........................................................
   // @method
   o.guid        = FRs3Object_guid;
   // @method
   o.unserialize = FRs3Object_unserialize;
   return o;
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FRs3Object_guid(){
   return this._guid;
}

//==========================================================
// <T>从输入流里反序列化数据内容</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3Object_unserialize(p){
   var o = this;
   o._guid = p.readString();
}
