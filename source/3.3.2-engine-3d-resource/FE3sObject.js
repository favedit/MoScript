//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FE3sObject(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._typeName   = null;
   o._guid       = null;
   o._code       = null;
   o._label      = null;
   //..........................................................
   // @method
   o.guid        = FE3sObject_guid;
   o.code        = FE3sObject_code;
   o.setCode     = FE3sObject_setCode;
   o.label       = FE3sObject_label;
   o.setLabel    = FE3sObject_setLabel;
   // @method
   o.unserialize = FE3sObject_unserialize;
   o.saveConfig  = FE3sObject_saveConfig;
   return o;
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FE3sObject_guid(){
   return this._guid;
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FE3sObject_code(){
   return this._code;
}

//==========================================================
// <T>设置代码。</T>
//
// @method
// @param p:code:String 代码
//==========================================================
function FE3sObject_setCode(p){
   this._code = p;
}

//==========================================================
// <T>获得标签。</T>
//
// @method
// @return String 标签
//==========================================================
function FE3sObject_label(){
   return this._label;
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param p:label:String 标签
//==========================================================
function FE3sObject_setLabel(p){
   this._label = p;
}

//==========================================================
// <T>从输入流里反序列化数据内容</T>
//
// @param input:FByteStream 数据流
//==========================================================
function FE3sObject_unserialize(input){
   var o = this;
   o._typeName = input.readString();
   o._guid = input.readString();
   o._code = input.readString();
   o._label = input.readString();
}

//==========================================================
// <T>数据内容存储到配置节点中。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FE3sObject_saveConfig(xconfig){
   var o = this;
   // 设置类型
   if(!RString.isEmpty(o._typeName)){
      xconfig.setName(o._typeName);
   }
   // 存储属性
   xconfig.set('guid', o._guid);
   xconfig.set('code', o._code);
   xconfig.set('label', o._label);
}
