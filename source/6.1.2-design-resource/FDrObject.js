//==========================================================
// <T>设计资源对象。</T>
//
// @class
// @author maocy
// @history 150131
//==========================================================
function FDrObject(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._guid       = null;
   o._code       = null;
   o._label      = null;
   //..........................................................
   // @method
   o.guid        = FDrObject_guid;
   o.code        = FDrObject_code;
   o.setCode     = FDrObject_setCode;
   o.label       = FDrObject_label;
   o.setLabel    = FDrObject_setLabel;
   // @method
   o.unserialize = FDrObject_unserialize;
   o.saveConfig  = FDrObject_saveConfig;
   return o;
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FDrObject_guid(){
   return this._guid;
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FDrObject_code(){
   return this._code;
}

//==========================================================
// <T>设置代码。</T>
//
// @method
// @param p:code:String 代码
//==========================================================
function FDrObject_setCode(p){
   this._code = p;
}

//==========================================================
// <T>获得标签。</T>
//
// @method
// @return String 标签
//==========================================================
function FDrObject_label(){
   return this._label;
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param p:label:String 标签
//==========================================================
function FDrObject_setLabel(p){
   this._label = p;
}

//==========================================================
// <T>从输入流里反序列化数据内容</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
function FDrObject_unserialize(p){
   var o = this;
   o._guid = p.readString();
   o._code = p.readString();
   o._label = p.readString();
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FDrObject_saveConfig(xconfig){
   var o = this;
   // 存储属性
   xconfig.setNvl('guid', o._guid);
   xconfig.setNvl('code', o._code);
   xconfig.setNvl('label', o._label);
}
