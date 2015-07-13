//==========================================================
// <T>资源对象。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FE3sObject = function FE3sObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MParent);
   //..........................................................
   // @attribute
   o._typeName   = null;
   o._guid       = MO.Class.register(o, new MO.AGetSet('_guid'));
   o._code       = MO.Class.register(o, new MO.AGetSet('_code'));
   o._label      = MO.Class.register(o, new MO.AGetSet('_label'));
   o._isClone    = false;
   //..........................................................
   // @method
   o.makeLabel   = MO.FE3sObject_makeLabel;
   // @method
   o.unserialize = MO.FE3sObject_unserialize;
   o.saveConfig  = MO.FE3sObject_saveConfig;
   o.clone       = MO.FE3sObject_clone;
   // @method
   o.dispose     = MO.FE3sObject_dispose;
   return o;
}

//==========================================================
// <T>生成显示名称。</T>
//
// @return String 显示名称
//==========================================================
MO.FE3sObject_makeLabel = function FE3sObject_makeLabel(){
   var o = this;
   var result = '';
   if(!MO.Lang.String.isEmpty(o._code)){
      result += o._code;
   }
   if(!MO.Lang.String.isEmpty(o._label)){
      result += ' [' + o._label + ']';
   }
   return result;
}

//==========================================================
// <T>从输入流里反序列化数据内容</T>
//
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sObject_unserialize = function FE3sObject_unserialize(input){
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
MO.FE3sObject_saveConfig = function FE3sObject_saveConfig(xconfig){
   var o = this;
   // 设置类型
   if(!MO.Lang.String.isEmpty(o._typeName)){
      xconfig.setName(o._typeName);
   }
   // 存储属性
   xconfig.set('guid', o._guid);
   xconfig.set('code', o._code);
   xconfig.set('label', o._label);
   if(o._isClone){
      xconfig.set('is_clone', 'Y');
   }
}

//==========================================================
// <T>克隆资源对象。</T>
//
// @method
// @param instance:FE3sObject 实例对象
// @return FE3sObject 资源对象
//==========================================================
MO.FE3sObject_clone = function FE3sObject_clone(instance){
   var o = this;
   var result = null;
   if(instance){
      result = instance;
   }else{
      result = MO.Class.create(o.constructor);
   }
   result._isClone = true;
   result._typeName = o._typeName;
   result._guid = o._guid;
   result._code = o._code;
   result._label = o._label;
   return result;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sObject_dispose = function FE3sObject_dispose(){
   var o = this;
   // 父处理
   o.__base.MAttributeParent.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
