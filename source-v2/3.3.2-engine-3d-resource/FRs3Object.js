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
   o._code       = null;
   o._label      = null;
   //..........................................................
   // @method
   o.guid        = FRs3Object_guid;
   o.code        = FRs3Object_code;
   o.label       = FRs3Object_label;
   // @method
   o.unserialize = FRs3Object_unserialize;
   o.saveConfig  = FRs3Object_saveConfig;
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
// <T>获得代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FRs3Object_code(){
   return this._code;
}

//==========================================================
// <T>获得标签。</T>
//
// @method
// @return String 标签
//==========================================================
function FRs3Object_label(){
   return this._label;
}

//==========================================================
// <T>从输入流里反序列化数据内容</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3Object_unserialize(p){
   var o = this;
   o._guid = p.readString();
   o._code = p.readString();
   o._label = p.readString();
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @param p:config:TXmlNode 配置节点
//==========================================================
function FRs3Object_saveConfig(p){
   var o = this;
   // 存储属性
   p.set('guid', o._guid);
   p.set('code', o._code);
   p.set('label', o._label);
}
